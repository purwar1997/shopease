import bcrypt from 'bcryptjs';
import User from '../models/user';
import Reason from '../models/reason';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import cookieOptions from '../utils/cookieOptions';
import mailSender from '../utils/mailSender';
import { validateEmail, validatePhoneNo } from '../services/validators';

/**
 * @SIGNUP
 * @request_type POST
 * @route http://localhost:4000/api/auth/signup
 * @description Controller that allows user to signup
 * @description email and phone no. will be validated using Abstract APIs
 * @parameters name, email, phoneNo, password, confirmPassword
 * @returns User object
 */

export const signup = asyncHandler(async (req, res) => {
  let { name, email, phoneNo, password, confirmPassword } = req.body;

  if (!(name && email && phoneNo && password && confirmPassword)) {
    throw new CustomError('Please provide all the details', 401);
  }

  email = email.trim();
  phoneNo = phoneNo.trim();

  try {
    if (!(await validateEmail(email))) {
      throw new CustomError('Invalid email ID', 401);
    }
  } catch (err) {
    throw err;
  }

  try {
    if (!(await validatePhoneNo(phoneNo))) {
      throw new CustomError('Invalid phone no.', 401);
    }
  } catch (err) {
    throw err;
  }

  if (password !== confirmPassword) {
    throw new CustomError("Confirmed password doesn't match with password", 401);
  }

  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    throw new CustomError('User already exists', 401);
  }

  user = new User({ name, email, phoneNo, password });
  user = await user.save();
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User successfully signed up',
    user,
  });
});

/**
 * @LOGIN
 * @request_type POST
 * @route http://localhost:4000/api/auth/login
 * @description Controller that allows user to login through email or phone number
 * @description email and phone no. will be validated using Abstract APIs
 * @parameters loginCredential, password
 * @returns Response object
 */

export const login = asyncHandler(async (req, res) => {
  let { loginCredential, password } = req.body;

  if (!loginCredential) {
    throw new CustomError('Email or phone no. is required', 401);
  }

  if (!password) {
    throw new CustomError('Password is required', 401);
  }

  loginCredential = loginCredential.trim();

  try {
    if (!((await validateEmail(loginCredential)) || (await validatePhoneNo(loginCredential)))) {
      throw new CustomError('Enter valid email ID or phone no.', 401);
    }
  } catch (err) {
    throw err;
  }

  let user = await User.findOne({ email: loginCredential.toLowerCase() }).select('+password');

  if (!user) {
    user = await User.findOne({ phoneNo: loginCredential }).select('+password');
  }

  if (!user) {
    throw new CustomError('User not registered', 401);
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new CustomError('Incorrect password', 401);
  }

  const token = user.generateJWTtoken();
  res.status(201).cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User successfully logged in',
  });
});

/**
 * @LOGOUT
 * @request_type GET
 * @route http://localhost:4000/api/auth/logout
 * @description Controller that allows user to logout
 * @parameters none
 * @returns Response object
 */

export const logout = asyncHandler(async (_req, res) => {
  res.status(201).clearCookie('token', cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User successfully logged out',
  });
});

/**
 * @FORGOT_PASSWORD
 * @request_type PUT
 * @route http://localhost:4000/api/auth/password/forgot
 * @description Controller that sends a reset password email to the user
 * @description Email will be validated using Abstract email validation API
 * @parameters email
 * @returns Response object
 */

export const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;

  if (!email) {
    throw new CustomError('Email is required', 401);
  }

  email = email.trim();

  try {
    if (!(await validateEmail(email))) {
      throw new CustomError('Invalid email ID', 401);
    }
  } catch (err) {
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new CustomError('Email not registered', 401);
  }

  const resetPasswordToken = user.generateForgotPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.hostname}/api/auth/password/reset/${resetPasswordToken}`;

  try {
    await mailSender({
      email: user.email,
      subject: 'Password reset email',
      html: `<p style='font-size:20px; font-family:Segoe UI'>
      Click on this <a style='text-decoration:none' href='${resetPasswordURL}' target='_blank'>
      link</a> to reset your password.
      </p>`,
    });

    res.status(201).json({
      success: true,
      message: `Password reset email successfully sent to ${user.email}`,
    });
  } catch (err) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    throw new CustomError(err.message || 'Failed to send password reset email', 500);
  }
});

/**
 * @PASSWORD_RESET
 * @request_type PUT
 * @route http://localhost:4000/api/auth/password/reset/:resetPasswordToken
 * @description Controller that allows user to reset his password
 * @parameters password, confirmPassword, resetPasswordToken
 * @returns Response object
 */

export const resetPassword = asyncHandler(async (req, res) => {
  let token = req.params.resetPasswordToken;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    throw new CustomError('Please provide all the details', 401);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Confirmed password doesn't match with password", 401);
  }

  token = crypto.createHash('sha256').update(token).digest('hex');

  let user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordExpiry: { $gt: new Date() },
  }).select('+password');

  if (!user) {
    throw new CustomError('Token invalid or expired', 401);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  user = await user.save();

  token = user.generateJWTtoken();
  res.status(201).cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Password reset success',
  });
});

/**
 * @PASSWORD_CHANGE
 * @request_type PUT
 * @route http://localhost:4000/api/auth/password/change
 * @description Controller that allows user to change his password
 * @parameters password, newPassword
 * @returns Response object
 */

export const changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;

  if (!password) {
    throw new CustomError('Enter your existing password', 401);
  }

  if (!newPassword) {
    throw new CustomError('Enter your new password', 401);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ _id: res.user._id, password: hashedPassword });

  if (!user) {
    throw new CustomError('Invalid password', 401);
  }

  user.password = newPassword;
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Password successfully changed',
  });
});

/**
 * @GET_PROFILE
 * @request_type GET
 * @route http://localhost:4000/api/auth/profile
 * @description Controller to fetch user's profile
 * @parameters none
 * @returns User object
 */

export const getProfile = asyncHandler(async (_req, res) => {
  const { user } = res;

  res.status(201).json({
    success: true,
    message: 'Profile successfully fetched',
    user,
  });
});

/**
 * @UPDATE_PROFILE
 * @request_type PUT
 * @route http://localhost:4000/api/auth/profile/update
 * @description Controller that allows user to update his profile
 * @description email and phone no. will be validated using Abstract APIs
 * @parameters name, email, phoneNo
 * @returns User object
 */

export const updateProfile = asyncHandler(async (req, res) => {
  let { name, email, phoneNo } = req.body;

  if (!(name && email && phoneNo)) {
    throw new CustomError('Please enter all the details', 401);
  }

  email = email.trim();
  phoneNo = phoneNo.trim();

  try {
    if (!(await validateEmail(email))) {
      throw new CustomError('Invalid email ID', 401);
    }
  } catch (err) {
    throw err;
  }

  try {
    if (!(await validatePhoneNo(phoneNo))) {
      throw new CustomError('Invalid phone no.', 401);
    }
  } catch (err) {
    throw err;
  }

  const user = await User.findOneAndUpdate(
    { _id: res.user._id },
    { name, email, phoneNo },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: 'Profile successfully updated',
    user,
  });
});

/**
 * @GET_ALL_PROFILES
 * @request_type GET
 * @route http://localhost:4000/api/auth/profiles
 * @description Controller to fetch all the profiles
 * @description Only admin can access user profiles
 * @parameters none
 * @returns Array of user objects
 */

export const getAllProfiles = asyncHandler(async (_req, res) => {
  const users = await User.find();

  if (!users.length) {
    throw new CustomError('Users not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Profiles successfully fetched',
    users,
  });
});

/**
 * @ACCOUNT_DELETE_REASONS
 * @request_type POST
 * @route http://localhost:4000/api/auth/profile/delete/reasons
 * @description Controller that allows user to provide reasons for deleting his account
 * @parameters reasons
 * @returns Reason object
 */

export const accountDeleteReasons = asyncHandler(async (req, res) => {
  const { reasons } = req.body;

  if (!reasons.length) {
    throw new CustomError('Please provide reasons for deleting your account', 401);
  }

  let reason = await Reason.findOne({ email: res.user.email });

  if (reason) {
    reason.reasons = reasons;
    reason = await reason.save();
  } else {
    reason = await Reason.create({ reasons, email: res.user.email });
  }

  res.status(201).json({
    success: true,
    message: 'Account deletion reasons have been noted',
    reason,
  });
});

/**
 * @DELETE_ACCOUNT
 * @request_type DELETE
 * @route http://localhost:4000/api/auth/profile/delete
 * @description Controller that allows user to delete his account
 * @parameters password
 * @returns Response object
 */

export const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new CustomError('Password is required', 401);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndDelete({ _id: res.user._id, password: hashedPassword });

  if (!user) {
    throw new CustomError('Incorrect password', 401);
  }

  await Reason.findOneAndUpdate(
    { email: res.user.email },
    { accountDeleted: true },
    { runValidators: true }
  );

  res.status(201).clearCookie('token', cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Account successfully deleted',
  });
});
