import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "Products",
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
  order: {
    type: mongoose.ObjectId,
    ref: "Order",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  // userPhoto: {
  //   data: Buffer,
  //   contentType: String,
  //   // default: "https://via.placeholder.com/50",
  // },
  userPhoto: {
    data: Buffer,
    contentType: String,
    url: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Review", reviewSchema);
