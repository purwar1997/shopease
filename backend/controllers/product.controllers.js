import formidable from 'formidable';
import mongoose from 'mongoose';
import fs from 'fs';
import Product from '../models/product';
import Category from '../models/category';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import { uploadFile, deleteFile } from '../services/fileHandlers';
import config from '../config/config';

/**
 * @ADD_PRODUCT
 * @request_type POST
 * @route http://localhost:4000/api/product/add
 * @description Controller to add a product to the database
 * @description Only admin and moderator can add products
 * @description Product images will be stored inside ASW S3
 * @parameters fields, files
 * @returns Product object
 */

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    filter: ({ mimetype }) => mimetype && mimetype.includes('image'),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw new CustomError(err.message || 'Error parsing form data', 401);
    }

    if (!(fields.name && fields.price && fields.description && fields.stock && fields.category)) {
      throw new CustomError('Please enter all the details', 401);
    }

    fields.price = Number(fields.price);

    if (isNaN(fields.price)) {
      throw new CustomError('Product price must be a number', 401);
    }

    fields.stock = Number(fields.stock);

    if (isNaN(fields.stock)) {
      throw new CustomError('Product stock must be a number', 401);
    }

    const category = await Category.findOne({ name: fields.category });

    if (!category) {
      throw new CustomError('Product category not found', 401);
    }

    if (!files.productImages.length) {
      throw new CustomError('Please provide product images', 401);
    }

    const productId = new mongoose.Types.ObjectId().toHexString();

    try {
      const imageURLs = await Promise.all(
        files.productImages.map(async (file, index) => {
          const fileData = fs.readFileSync(file.path);

          const res = await uploadFile({
            bucket: config.S3_BUCKET_NAME,
            file: fileData,
            key: `/image_${index + 1}/${productId}`,
            mimetype: file.type,
            fileSize: file.size,
          });

          return { url: res.Location, key: res.Key };
        })
      );

      const product = await Product.create({
        _id: productId,
        name: fields.name,
        price: fields.price,
        description: fields.description,
        images: imageURLs,
        stock: fields.stock,
        categoryId: category._id,
      });

      res.status(201).json({
        success: true,
        message: 'Product successfully added',
        product,
      });
    } catch (err) {
      throw new CustomError(err.message || 'Error uploading images', 401);
    }
  });
});

/**
 * @UPDATE_PRODUCT
 * @request_type PUT
 * @route http://localhost:4000/api/product/update/:productId
 * @description Controller to update a product
 * @description Only admin can moderator can update a product
 * @description Product images will be stored inside AWS S3
 * @parameters fields, files, productId
 * @returns Product object
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError('Product not found', 401);
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    filter: ({ mimetype }) => mimetype && mimetype.includes('image'),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw new CustomError(err.message || 'Error parsing form data', 401);
    }

    if (!(fields.name && fields.price && fields.description && fields.stock && fields.category)) {
      throw new CustomError('Please enter all the details', 401);
    }

    fields.price = Number(fields.price);

    if (isNaN(fields.price)) {
      throw new CustomError('Product price must be a number', 401);
    }

    fields.stock = Number(fields.stock);

    if (isNaN(fields.stock)) {
      throw new CustomError('Product stock must be a number', 401);
    }

    const category = await Category.findOne({ name: fields.category });

    if (!category) {
      throw new CustomError('Product category not found', 401);
    }

    let imageURLs;

    if (files.productImages.length) {
      try {
        imageURLs = await Promise.all(
          files.productImages.map(async (file, index) => {
            const fileData = fs.readFileSync(file.path);

            const res = await uploadFile({
              bucket: config.S3_BUCKET_NAME,
              file: fileData,
              key: `/image_${index + 1}/${productId}`,
              mimetype: file.type,
              fileSize: file.size,
            });

            return { url: res.Location, key: res.Key };
          })
        );

        try {
          await Promise.all(
            product.images.map(async ({ key }, index) => {
              if (index >= fields.productImages.length) {
                await deleteFile({
                  bucket: config.S3_BUCKET_NAME,
                  key: key,
                });
              }
            })
          );
        } catch (err) {
          throw new CustomError(err.message || 'Error deleting images', 401);
        }
      } catch (err) {
        throw new CustomError(err.message || 'Error uploading images', 401);
      }
    } else {
      imageURLs = product.images;
    }

    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        name: fields.name,
        price: fields.price,
        description: fields.description,
        images: imageURLs,
        stock: fields.stock,
        categoryId: category._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      success: true,
      message: 'Product successfully updated',
      product,
    });
  });
});

/**
 * @DELETE_PRODUCT
 * @request_type DELETE
 * @route http://localhost:4000/api/product/delete/:productId
 * @description Controller to delete a product
 * @description Only admin can moderator can delete a product
 * @description Product images will be deleted from AWS S3
 * @parameters productId
 * @returns Response object
 */

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError('Product not found', 401);
  }

  try {
    await Promise.all(
      product.images.map(async ({ key }) => {
        await deleteFile({
          bucket: config.S3_BUCKET_NAME,
          key: key,
        });
      })
    );
  } catch (err) {
    throw new CustomError(err.message || 'Error deleting images', 401);
  }

  await Product.findByIdAndDelete(productId);

  res.status(201).json({
    success: true,
    message: 'Product successfully deleted',
  });
});

/**
 * @GET_PRODUCT
 * @request_type GET
 * @route http://localhost:4000/api/product/:productId
 * @description Controller to fetch a product
 * @parameters productId
 * @returns Product object
 */

export const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError('Product not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Product successfully fetched',
    product,
  });
});

/**
 * @GET_ALL_PRODUCTS
 * @request_type GET
 * @route http://localhost:4000/api/products
 * @description Controller to fetch all the products
 * @parameters none
 * @returns Array of product objects
 */

export const getAllProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find();

  if (!products.length) {
    throw new CustomError('Products not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Products successfully fetched',
    products,
  });
});
