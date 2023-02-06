import JWT from 'jsonwebtoken';
import User from '../models/user';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import config from '../config/config';

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    token = req.cookies.token || req.headers.authorization.split(' ')[1];
  }

  try {
    const { userId } = JWT.verify(token, config.TOKEN_SECRET_KEY);
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError('User not found', 401);
    }

    res.user = user;
  } catch (err) {
    throw new CustomError(err.message || 'Invalid token', 401);
  }

  next();
});

export default auth;
