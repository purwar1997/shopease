import mongoose from 'mongoose';
import regexp from '../utils/regex';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide a coupon code'],
      minLength: [5, 'Coupon code should contain atleast 5 characters'],
      maxLength: [15, 'Coupon code should be less than 15 characters'],
      uppercase: true,
      trim: true,
      validate: {
        validator: code => {
          const regex = new RegExp(regexp.couponCode);
          return regex.test(code);
        },
        message: 'Coupon code should only contain capital letters and digits',
      },
    },
    discount: {
      type: Number,
      required: [true, 'Please provide a coupon discount'],
      default: 0,
      validate: {
        validator: discount => Number.isInteger(discount) && discount > 0,
        message: 'Discount should be a positive integer',
      },
    },
    orderAmount: {
      type: Number,
      required: [true, 'Please provide order amount on which coupon should be applied'],
      min: [250, 'Order amount should be atleast ₹250 to redeem coupons'],
      set: value => Math.round(value),
    },
    expires: {
      type: Date,
      required: [true, 'Please provide expiry date of coupon'],
      validate: {
        validator: date => date > new Date(Date.now() + 24 * 60 * 60 * 1000),
        message: "You can't choose any previous or current date as an expiry date",
      },
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
