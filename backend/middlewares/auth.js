import JWT from 'jsonwebtoken';
import User from '../models/user';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import config from '../config/config';

const auth = asyncHandler(async (req, res) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    token = req.cookies.token || req.headers.authorization.split(' ')[1];
  }

  try {
    const { userId } = JWT.verify(token, config.TOKEN_SECRET);
    const user = await User.findById(userId).select({ name: 1, email: 1, role: 1 });
    res.user = user;
  } catch (err) {
    throw new CustomError('Invalid token', 401);
  }
});

export default auth;
