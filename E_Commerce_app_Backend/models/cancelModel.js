import mongoose from "mongoose";

const cancelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    orderId: {
      type: mongoose.ObjectId,
      ref: "Order",
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cancel", cancelSchema);