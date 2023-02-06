import mongoose from 'mongoose';

const reasonSchema = new mongoose.Schema(
  {
    reasons: {
      type: [String],
      required: [true, 'Please provide reasons for deleting your account'],
    },
    email: {
      type: String,
      required: true,
    },
    accountDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Reason', reasonSchema);
