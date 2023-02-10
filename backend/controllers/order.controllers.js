import Order from '../models/order';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import razorpay from '../config/razorpay.config';

/**
 * @GENEREATE_ORDER_ID
 * @request_type GET
 * @route http://localhost:4000/api/order/generateOrderId
 * @description Controller to generate an order ID using razorpay Orders API
 * @parameters amountToPay
 * @returns Order object
 */

export const generateOrderID = asyncHandler(async (req, res) => {
  const { amountToPay } = req.body;

  if (!amountToPay) {
    throw new CustomError('Please provide an amount against which an order has to be made', 401);
  }

  try {
    const order = await razorpay.orders.create({
      amount: amountToPay * 100,
      currency: 'INR',
      receipt: `Receipt: ${new Date().toLocaleDateString}`,
    });

    res.status.json({
      success: true,
      message: 'Order ID successfully generated',
      order,
    });
  } catch (err) {
    throw new CustomError('Failed to generate order ID', 401);
  }
});

/**
 * @CREATE_ORDER
 * @request_type POST
 * @route http://localhost:4000/api/order/create
 * @description Controller to create an order
 * @parameters
 * @returns Order object
 */

export const createOrder = asyncHandler(async (req, res) => {});
