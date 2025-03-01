import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      default: "6666666666",
    },
    address: {
      type: String,
      required: false,
      default: "A",
    },
    answer: {
      type: String,
      required: false,
      default: "A",
    },
    role: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    photo: {
      data: Buffer, 
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);