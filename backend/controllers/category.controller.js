import Category from '../models/category';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/** Controllers for Category model */

/**
 * @CREATE_CATEGORY
 * @request_type POST
 * @route http://localhost:4000/api/createCategory
 * @description This controller is used to create a category
 * @parameters name
 * @returns category object
 */

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError('Category name is required', 401);
  }

  const category = await Category.create({ name });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category,
  });
});

/**
 * @EDIT_CATEGORY
 * @request_type PUT
 * @route http://localhost:4000/api/editCategory/:categoryId
 * @description This controller is used to edit a category
 * @parameters name, categoryId
 * @returns category object
 */

export const editCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new CustomError('Category name is required', 401);
  }

  const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });

  res.status(201).json({
    success: true,
    message: 'Category updated successfully',
    category,
  });
});

/**
 * @DELETE_CATEGORY
 * @request_type DELETE
 * @route http://localhost:4000/api/deleteCategory/:categoryId
 * @description This controller is used to delete a category
 * @parameters categoryId
 * @returns response object
 */

export const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.categoryId);

  res.status(201).json({
    success: true,
    message: 'Category deleted successfully',
  });
});

/**
 * @GET_CATEGORY
 * @request_type GET
 * @route http://localhost:4000/api/getCategory/:categoryId
 * @description This controller is used to fetch a category
 * @parameters categoryId
 * @returns category object
 */

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);

  res.status(201).json({
    success: true,
    message: 'Category fetched successfully',
    category,
  });
});

/**
 * @GET_CATEGORIES
 * @request_type GET
 * @route http://localhost:4000/api/getCategories
 * @description This controller is used to fetch all the categories
 * @parameters none
 * @returns array of category objects
 */

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find();

  res.status(201).json({
    success: true,
    message: 'Categories fetched successfully',
    categories,
  });
});
