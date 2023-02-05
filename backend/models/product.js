import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      maxLength: [50, 'Product name should be less than 50 characters'],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [50, "Product less than ₹50 can't be listed"],
      set: price => Math.round(price),
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxLength: [200, 'Product description should be less than 200 characters'],
      lowercase: true,
      trim: true,
    },
    images: {
      type: [{ url: { type: String, required: true }, key: { type: String, required: true } }],
      required: [true, 'Please provide product images'],
    },
    stock: {
      type: Number,
      required: true,
      validate: {
        validator: stock => stock >= 0 && Number.isInteger(stock),
        message: 'Stock must be a positive integer',
      },
    },
    soldUnits: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          rating: {
            type: Number,
            required: true,
            enum: {
              values: [1, 2, 3, 4, 5],
              message: 'Product rating should be in between 1 and 5',
            },
          },
          headline: {
            type: String,
            required: true,
            maxlength: [100, 'Review headline should be less than 100 characters'],
            trim: true,
          },
          review: {
            type: String,
            maxLength: [500, 'Product review should be less than 500 characters'],
            trim: true,
          },
          userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        },
      ],
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
