import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

export const role = asyncHandler(async (req, _res, next) => {
  if (user.role === 'User') {
    if (req.originalURL.includes('coupon')) {
      throw new CustomError('Only admin and moderator can access coupons dashboard', 403);
    }

    if (req.originalURL.includes('product')) {
      throw new CustomError('Only admin and moderator can access products dashboard', 403);
    }
  }

  next();
});
