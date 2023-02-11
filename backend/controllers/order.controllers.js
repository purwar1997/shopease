import Order from '../models/order';
import Product from '../models/product';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import razorpay from '../config/razorpay.config';
import config from '../config/config';

var { validatePaymentVerification } = require('./dist/utils/razorpay-utils');

/**
 * @GENEREATE_ORDER_ID
 * @request_type GET
 * @route http://localhost:4000/api/order/generateOrderId
 * @description Controller to generate an order ID using razorpay Orders API
 * @parameters products, address, orderAmount, shippingCharge, couponDiscount, amountToPay
 * @returns RazorpayOrder
 */

export const generateOrderID = asyncHandler(async (req, res) => {
  const { products, address, orderAmount, shippingCharge, couponDiscount, amountToPay } = req.body;

  if (!(products && address && orderAmount && shippingCharge && amountToPay)) {
    throw new CustomError('Please provide all the details', 401);
  }

  let razorpayOrder;

  try {
    razorpayOrder = await razorpay.orders.create({
      amount: amountToPay * 100,
      currency: 'INR',
      receipt: `Receipt: ${new Date().toLocaleDateString}`,
    });
  } catch (err) {
    throw new CustomError(err.error.description || 'Failed to generate order ID', 401);
  }

  const order = new Order({
    _id: razorpayOrder.id,
    userId: res.user._id,
    products,
    address,
    orderAmount,
    shippingCharge,
    couponDiscount,
    receipt: razorpayOrder.receipt,
  });

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    meassge: 'Order ID successfully generated',
    order: razorpayOrder,
  });
});

/**
 * @CREATE_ORDER
 * @request_type POST
 * @route http://localhost:4000/api/order/create
 * @description Controller to create an order in database if the payment is successful
 * @parameters response, orderId
 * @returns Order object
 */

export const createOrder = asyncHandler(async (req, res) => {
  const { response, orderId } = req.body;
  const { razorpay_payment_id, razorpay_signature } = response;

  const isPaymentValid = validatePaymentVerification(
    {
      order_id: orderId,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    config.RAZORPAY_KEY_SECRET
  );

  if (!isPaymentValid) {
    await Order.findByIdAndDelete(orderId);
    throw new CustomError('Payment invalid', 401);
  }

  let payment;

  try {
    payment = await razorpay.payments.fetch(razorpay_payment_id);
  } catch (err) {
    throw new CustomError(err.error.description || 'Failed to fetch payment', 401);
  }

  if (payment.status === 'captured') {
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        amountPaid: Math.round(payment.amount / 100),
        paymentMode: payment.method,
        transactionId: payment.id,
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    order.products.forEach(async ({ productId, quantity }) => {
      const product = await Product.findById(productId);

      product.soldUnits = product.soldUnits + quantity;
      product.stock = product.stock - quantity;
      await product.save();
    });

    const { user } = res;

    user.cart.splice(0, user.cart.length);
    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: 'Order successfully created',
      order,
    });
  }
});
