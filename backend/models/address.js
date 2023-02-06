import mongoose from 'mongoose';
import regexp from '../utils/regex';

const addressSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: [true, 'Please enter a recepient name'],
      lowercase: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      unique: true,
      required: [
        true,
        'Please enter a phone number so we can call if there are any issues with delivery',
      ],
      trim: true,
      validate: {
        validator: phoneNo => {
          const regex = new RegExp(regexp.phoneNo);
          return regex.test(phoneNo);
        },
        message: 'Please enter a valid phone number',
      },
    },
    pincode: {
      type: String,
      index: true,
      required: [true, 'Please enter a valid zip or postal code'],
      trim: true,
      validate: {
        validator: pincode => {
          const regex = new RegExp(regexp.pincode);
          return regex.test(pincode);
        },
        message: 'Please enter a valid pincode',
      },
    },
    houseNo: {
      type: String,
      required: [true, 'Please enter a house number'],
      trim: true,
    },
    locality: {
      type: String,
      required: [true, 'Please enter an address'],
      maxLength: [100, 'Address should be less than 100 characters'],
      trim: true,
    },
    landmark: {
      type: String,
      maxlength: [100, 'Landmark name should be less than 100 characters'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please enter a city name'],
      lowercase: true,
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'Please choose a state or province'],
      lowercase: true,
    },
    country: {
      type: String,
      required: [true, 'Please choose a country'],
      lowercase: true,
    },
    addressType: {
      type: String,
      default: 'home',
      required: [true, 'Please select your address type'],
      enum: ['home', 'office'],
    },
    setDefault: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Address', addressSchema);
