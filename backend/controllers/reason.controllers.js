import Reason from '../models/reason';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/**
 * @GET_REASON
 * @request_type GET
 * @route http://localhost:4000/api/reason/:reasonId
 * @description Controller to fetch reasons for why user has deleted his account
 * @parameters reasonId
 * @returns Reason object
 */

export const getReason = asyncHandler(async (req, res) => {
  const { reasonId } = req.params;
  const reason = await Reason.findById(reasonId);

  if (!reason) {
    throw new CustomError('Reason not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Reason successfully fetched',
    reason,
  });
});

/**
 * @GET_ALL_REASONS
 * @request_type GET
 * @route http://localhost:4000/api/reasons
 * @description Controller to fetch all reasons for which users have deleted their accounts
 * @parameters none
 * @returns Array of reason objects
 */

export const getAllReasons = asyncHandler(async (_req, res) => {
  const reasons = await Reason.find({ accountDeleted: true });

  if (!reasons.length) {
    throw new CustomError('No user has deleted his account', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Reasons successfully fetched',
    reasons,
  });
});
