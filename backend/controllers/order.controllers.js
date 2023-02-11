import Order from '../models/order';
import Product from '../models/product';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import razorpay from '../config/razorpay.config';
import config from '../config/config';

const { validatePaymentVerification } = require('./dist/utils/razorpay-utils');

/**
 * @GENEREATE_ORDER_ID
 * @request_type POST
 * @route http://localhost:4000/api/order/generateOrderId
 * @description Controller to generate an order ID using razorpay Orders API
 * @parameters products, address, orderAmount, shippingCharge, couponDiscount, amountToPay
 * @returns RazorpayOrder
 */

export const generateOrderId = asyncHandler(async (req, res) => {
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
    throw new CustomError(err.error.description || 'Failed to generate order Id', 401);
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
    meassge: 'Order Id successfully generated',
    order: razorpayOrder,
  });
});

/**
 * @CREATE_ORDER
 * @request_type PUT
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

/**
 * @GET_ORDER
 * @request_type GET
 * @route http://localhost:4000/api/order/:orderId
 * @description Controller that allows user to fetch order based on orderId
 * @parameters orderId
 * @returns Order object
 */

export const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new CustomError('Order not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Order successfully fetched',
    order,
  });
});

/**
 * @GET_ALL_ORDERS
 * @request_type GET
 * @route http://localhost:4000/api/orders
 * @description Controller that allows user to fetch all his orders
 * @parameters none
 * @returns Array of order objects
 */

export const getAllOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find({ userId: res.user._id });

  if (!orders.length) {
    throw new CustomError('Orders not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Orders successfully fetched',
    orders,
  });
});

/**
 * @GET_ALL_USERS_ORDERS
 * @request_type GET
 * @route http://localhost:4000/api/orders/all
 * @description Controller to fetch all the orders of all the users
 * @description Only admin can fetch all users orders
 * @parameters none
 * @returns Array of order objects
 */

export const getAllUsersOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find();

  if (!orders.length) {
    throw new CustomError('Orders not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'All orders successfully fetched',
    orders,
  });
});

/**
 * @CANCEL_ORDER
 * @request_type PUT
 * @route http://localhost:4000/api/order/cancel/:orderId
 * @description Controller that allows user to cancel order based on orderId
 * @parameters orderId
 * @returns Order object
 */

export const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { orderStatus: 'cancelled', deliveryDate: null },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new CustomError('Failed to cancel order', 401);
  }

  order.products.forEach(async ({ productId, quantity }) => {
    const product = await Product.findById(productId);

    product.stock = product.stock + quantity;
    product.soldUnits = product.soldUnits - quantity;
    await product.save();
  });

  res.status(201).json({
    success: true,
    message: 'Order successfully cancelled',
    order,
  });
});

/**
 * @UPDATE_ORDER_STATUS
 * @request_type PUT
 * @route http://localhost:4000/api/order/status/:orderId
 * @description Controller to update order status to 'Shipped' or 'Delivered'
 * @description Only admin can update order status
 * @parameters orderId, orderStatus
 * @returns Order object
 */

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  if (orderStatus !== 'shipped' && orderStatus !== 'delivered') {
    throw new CustomError('Order status can only be updated to either shipped or delivered', 401);
  }

  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { orderStatus },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new CustomError('Failed to update order status', 401);
  }

  res.status(201).json({
    success: true,
    meassge: `Order status updated to ${orderStatus}`,
    order,
  });
});

/**
 * @ADD_DELIVERY_FEEDBACK
 * @request_type PUT
 * @route http://localhost:4000/api/order/feedback/:orderId
 * @description Controller that allows user to rate his delivery experience
 * @parameters orderId, rating
 * @returns Response object
 */

export const addDeliveryFeedback = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { rating } = req.body;

  if (!rating) {
    throw new CustomError('Please rate your delivery experience', 401);
  }

  const order = await Order.findOneAndUpdate(
    { _id: orderId, orderStatus: 'delivered' },
    { rating },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new CustomError('Order not found or not yet delivered', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback',
  });
});
