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
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxLength: [200, 'Product description should be less than 200 characters'],
      lowercase: true,
      trim: true,
    },
    images: {
      type: [{ url: { type: String, required: true } }],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    soldUnits: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
