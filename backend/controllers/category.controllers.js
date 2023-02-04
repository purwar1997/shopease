import Category from '../models/category';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/**
 * @CREATE_CATEGORY
 * @request_type POST
 * @route http://localhost:4000/api/category/create
 * @description Controller to create a category
 * @description Only admin and moderator can create a category
 * @parameters name
 * @returns Category object
 */

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError('Please provide category name', 401);
  }

  const category = await Category.create({ name });

  res.status(201).json({
    success: true,
    message: 'Category successfully created',
    category,
  });
});

/**
 * @UPDATE_CATEGORY
 * @request_type PUT
 * @route http://localhost:4000/api/category/update/:categoryId
 * @description Controller to update a category
 * @description Only admin and moderator can update a category
 * @parameters name, categoryId
 * @returns Category object
 */

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new CustomError('Please provide category name', 401);
  }

  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    { name },
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new CustomError('Category not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Category successfully updated',
    category,
  });
});

/**
 * @DELETE_CATEGORY
 * @request_type DELETE
 * @route http://localhost:4000/api/category/delete/:categoryId
 * @description Controller to delete a category
 * @description Only admin and moderator can delete a category
 * @parameters categoryId
 * @returns Response object
 */

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.categoryId);

  if (!category) {
    throw new CustomError('Category not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Category successfully deleted',
  });
});

/**
 * @GET_CATEGORY
 * @request_type GET
 * @route http://localhost:4000/api/category/:categoryId
 * @description Controller to fetch a category
 * @parameters categoryId
 * @returns Category object
 */

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    throw new CustomError('Category not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Category successfully fetched',
    category,
  });
});

/**
 * @GET_CATEGORIES
 * @request_type GET
 * @route http://localhost:4000/api/categories
 * @description Controller to fetch all the categories
 * @parameters none
 * @returns Array of category objects
 */

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find();

  if (!categories.length) {
    throw new CustomError('Categories not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Categories successfully fetched',
    categories,
  });
});
