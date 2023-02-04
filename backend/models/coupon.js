import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide coupon code'],
      minLength: [6, 'Coupon code should be atleast 6 characters long'],
      maxLength: [10, 'Coupon code should be less than 10 characters'],
      match: [/^[0-9A-Z]+$/, 'Coupon code should only contain digits and uppercase letters'],
      trim: true,
    },
    discount: {
      type: Number,
      required: [true, 'Please provide coupon discount'],
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
