import mongoose from 'mongoose';

const paymentModes = {
  UPI: 'UPI',
  debitCard: 'Debit card',
  creditCard: 'Credit card',
  COD: 'Payment on delivery',
};

const orderStatus = {
  ordered: 'Ordered',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phoneNo: {
      type: String,
      required: [true, 'Please provide your phone no'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide your address'],
      trim: true,
    },
    amountToPay: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      trim: true,
    },
    paymentMode: {
      type: String,
      required: true,
      enum: Object.values(paymentModes),
    },
    orderStatus: {
      type: String,
      required: true,
      default: orderStatus.ordered,
      enum: Object.values(orderStatus),
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
