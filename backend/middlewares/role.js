import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

export const role = asyncHandler(async (_req, res, next) => {
  const { user } = res;

  if (!user) {
    throw new CustomError('User not found', 401);
  }

  if (user.role === 'User') {
    throw new CustomError(
      'Only admin and moderator can access products and coupons dashboard',
      403
    );
  }

  next();
});
