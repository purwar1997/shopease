import mongoose from 'mongoose';

const paymentModes = {
  UPI: 'upi',
  debitCard: 'debit card',
  creditCard: 'credit card',
  wallet: 'wallet',
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
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: [true, 'Please provide products that user wants to order'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Please provide an address where you want your order to be delivered'],
    },
    orderAmount: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    amountPaid: {
      type: Number,
      required: true,
      set: amount => Math.round(amount * 100) / 100,
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
    deliveryDate: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: 'Delivery rating should be in between 1 and 5',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
