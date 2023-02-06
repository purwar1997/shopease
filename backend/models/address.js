import mongoose from 'mongoose';

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
        validator: phoneNo =>
          Number.isInteger(Number(phoneNo)) &&
          Number(phoneNo) > 0 &&
          phoneNo.length === 10 &&
          (phoneNo[0] === '9' || phoneNo[0] === '8' || phoneNo[0] === '7' || phoneNo[0] === '6'),

        message: 'Please enter a valid phone number',
      },
    },
    pincode: {
      type: String,
      index: true,
      required: [true, 'Please enter a valid zip or postal code'],
      trim: true,
      validate: {
        validator: pincode =>
          Number.isInteger(Number(pincode)) &&
          Number(pincode) > 0 &&
          pincode.length === 6 &&
          pincode[0] !== '0',

        message: 'Pincode invalid',
      },
    },
    houseNo: {
      type: String,
      required: [true, 'Please enter your house number'],
      trim: true,
      validate: {
        validator: houseNo => Number.isInteger(Number(houseNo)) && Number(houseNo) > 0,
        message: 'Please enter a valid house number',
      },
    },
    locality: {
      type: String,
      required: [true, 'Please enter your address'],
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
      required: [true, 'Please enter your city name'],
      lowercase: true,
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'Please enter your state'],
      lowercase: true,
      trim: true,
    },
    addressType: {
      type: String,
      default: 'home',
      required: true,
      enum: ['home', 'office'],
    },
    default: {
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
