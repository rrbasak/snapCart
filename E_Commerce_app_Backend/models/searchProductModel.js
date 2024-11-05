import mongoose from "mongoose";

const searchProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Searchproduct", searchProductSchema);
