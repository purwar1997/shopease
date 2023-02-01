import Coupon from '../models/coupon';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/**
 * @CREATE_COUPON
 * @request_type POST
 * @route http://localhost:4000/api/coupon/create
 * @description Controller to create a coupon
 * @description Only admin and moderator can create a coupon
 * @parameters code, discount
 * @returns Coupon object
 */

export const createCoupon = asyncHandler(async (req, res) => {
  let { code, discount } = req.body;

  if (!code || !discount) {
    throw new CustomError('Please enter all the details', 401);
  }

  discount = Number(discount);

  if (isNaN(discount)) {
    throw new CustomError('Discount should be a number', 401);
  }

  const coupon = await Coupon.create({ code, discount });

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
    { _id: couponId },
    { isActive: false },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError('Coupon not found', 401);
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
    { _id: couponId },
    { isActive: true },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError('Coupon not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Coupon successfully activated',
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
 * @GET_ALL_COUPONS
 * @request_type GET
 * @route http://localhost:4000/api/coupons
 * @description Controller to fetch all the coupons
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
