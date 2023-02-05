import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import authRoles from '../utils/authRoles';
import config from '../config/config';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [50, 'Name should be less than 50 characters'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: email =>
          (email.endsWith('@gmail.com') || email.endsWith('@outlook.com')) &&
          email.indexOf('@') !== 0,

        message: 'Please enter a valid email',
      },
    },
    phoneNo: {
      type: String,
      unique: true,
      required: [true, 'Phone no. is required'],
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
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be atleast 6 characters long'],
      maxLength: [20, 'Password must be less than 20 characters'],
      select: false,
    },
    role: {
      type: String,
      default: authRoles.User,
      enum: Object.values(authRoles),
      required: true,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    wishlist: {
      products: [{ productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true } }],
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    cart: {
      products: [
        {
          productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
          count: { type: Number, required: true, default: 1 },
          price: Number,
        },
      ],
      amount: {
        type: Number,
        default: 0,
        set: amount => Math.round(amount),
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  generateJWTtoken: function () {
    const token = JWT.sign({ userId: this._id, role: this.role }, config.TOKEN_SECRET, {
      expiresIn: config.TOKEN_EXPIRES_IN,
    });

    return token;
  },

  generateForgotPasswordToken: function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    this.forgotPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);

    return token;
  },
};

export default mongoose.model('User', userSchema);
