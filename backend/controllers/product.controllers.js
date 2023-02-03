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
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw new CustomError(err.message || 'Failed to parse form data', 401);
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

    if (!files) {
      throw new CustomError('Please provide product images', 401);
    }

    const productId = new mongoose.Types.ObjectId().toHexString();

    try {
      const imageURLs = await Promise.all(
        Object.values(files).map(async (file, index) => {
          const fileData = fs.readFileSync(file.filepath);

          const res = await uploadFile({
            bucket: config.S3_BUCKET_NAME,
            file: fileData,
            key: `/${fields.name}/image-${index + 1}/${productId}`,
            type: file.mimetype,
          });

          return { url: res.Location };
        })
      );

      const product = await Product.create({
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
      throw new CustomError(err.message || 'Failed to upload images', 401);
    }
  });
});
