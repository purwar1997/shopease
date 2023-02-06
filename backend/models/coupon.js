import mongoose from 'mongoose';
import regexp from '../utils/regex';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide a coupon code'],
      minLength: [6, 'Coupon code should be atleast 6 characters long'],
      maxLength: [10, 'Coupon code should be less than 10 characters'],
      trim: true,
      validate: {
        validator: code => {
          const regex = new RegExp(regexp.couponCode);
          return regex.test(code);
        },
        message: 'Coupon code should only contain letters and digits',
      },
    },
    discount: {
      type: Number,
      required: [true, 'Please provide a coupon discount'],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Coupon', couponSchema);
