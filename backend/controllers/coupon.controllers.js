import Coupon from '../models/coupon';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/**
 * @CREATE_COUPON
 * @request_type POST
 * @route http://localhost:4000/api/coupon/create
 * @description Controller to create a coupon
 * @description Only admin and moderator can create a coupon
 * @parameters code, discount, orderAmount, expiryDate
 * @returns Coupon object
 */

export const createCoupon = asyncHandler(async (req, res) => {
  let { code, discount, orderAmount, expiryDate } = req.body;

  if (!(code && discount && orderAmount && expiryDate)) {
    throw new CustomError('Please enter all the details', 401);
  }

  discount = Number(discount);

  if (isNaN(discount)) {
    throw new CustomError('Discount should be a positive integer', 401);
  }

  orderAmount = Number(orderAmount);

  if (isNaN(orderAmount)) {
    throw new CustomError('Order amount should be a number', 401);
  }

  const [year, month, day] = expiryDate.split('-');

  const coupon = await Coupon.create({
    code,
    discount,
    orderAmount,
    expires: new Date(year, month - 1, day, 23, 59, 59, 999),
  });

  res.status(201).json({
    success: true,
    message: 'Coupon successfully created',
    coupon,
  });
});

/**
 * @DEACTIVATE_COUPON
 * @request_type PUT
 * @route http://localhost:4000/api/coupon/deactivate/:couponId
 * @description Controller to deactivate a coupon
 * @description Only admin and moderator can deactivate a coupon
 * @parameters couponId
 * @returns Coupon object
 */

export const deactivateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId, expires: { $gt: new Date() } },
    { isActive: false },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError('Coupon invalid or expired', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Coupon successfully deactivated',
    coupon,
  });
});

/**
 * @ACTIVATE_COUPON
 * @request_type PUT
 * @route http://localhost:4000/api/coupon/activate/:couponId
 * @description Controller to activate a coupon
 * @description Only admin and moderator can activate a coupon
 * @parameters couponId
 * @returns Coupon object
 */

export const activateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId, expires: { $gt: new Date() } },
    { isActive: true },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError('Coupon invalid or expired', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Coupon successfully activated',
    coupon,
  });
});

/**
 * @SET_NEW_EXPIRY_DATE
 * @request_type PUT
 * @route http://localhost:4000/api/coupon/setExpiryDate/:couponId
 * @description Controller to set new expiry date for expired coupons
 * @description Only admin amd moderator can set expiry date for coupons
 * @parameters couponId, expiryDate
 * @returns Coupon object
 */

export const setNewExpiryDate = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const { expiryDate } = req.body;

  if (!expiryDate) {
    throw new CustomError('Please set new expiry date for coupon', 401);
  }

  const [year, month, day] = expiryDate.split('-');

  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId },
    { expires: new Date(year, month - 1, day, 23, 59, 59, 999), isActive: true },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError('Coupon not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Expiry date successfully set',
    coupon,
  });
});

/**
 * @DELETE_COUPON
 * @request_type DELETE
 * @route http://localhost:4000/api/coupon/delete/:couponId
 * @description Controller to delete a coupon
 * @description Only admin and moderator can delete a coupon
 * @parameters couponId
 * @returns Response object
 */

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const coupon = await Coupon.findByIdAndDelete(couponId);

  if (!coupon) {
    throw new CustomError('Coupon not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Coupon successfully deleted',
  });
});

/**
 * @GET_VALID_COUPONS
 * @request_type GET
 * @route http://localhost:4000/api/coupons/valid
 * @description Controller to fetch all valid coupons
 * @parameters none
 * @returns Array of coupon objects
 */

export const getValidCoupons = asyncHandler(async (_req, res) => {
  const coupons = await Coupon.find({ expires: { $gt: new Date() }, isActive: true });

  if (!coupons.length) {
    throw new CustomError('No valid coupon found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'All valid coupons successfully fetched',
    coupons,
  });
});

/**
 * @GET_ALL_COUPONS
 * @request_type GET
 * @route http://localhost:4000/api/coupons
 * @description Controller to fetch all coupons
 * @description Only admin and moderator can access coupons
 * @parameters none
 * @returns Array of coupon objects
 */

export const getAllCoupons = asyncHandler(async (_req, res) => {
  const coupons = await Coupon.find();

  if (!coupons.length) {
    throw new CustomError('Coupons not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Coupons successfully fetched',
    coupons,
  });
});
