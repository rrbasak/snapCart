import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.ObjectId,
    ref: "Products",
    required: true,
  },
  orgprice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalquantity: {
    type: Number,
    required: true,
    default: 1,
  },
  isprime: {
    type: String,
  },
  isexchangeapplied: {
    type: Boolean,
  },
  exchangeProduct: {
    type: mongoose.ObjectId,
    ref: "Exchangeproduct",
    required: false,
  },
  selectedspecPrice: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Cart", cartSchema);
