import mongoose from "mongoose";

const priceVariantSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    ram: {
      type: String,
      required: false,
    },
    material: {
      type: String,
      required: false,
    },
    style: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: false,
    },
    heelType: {
      type: String,
      required: false,
    },
    capacity: {
      type: String,
      required: false,
    },
    waterproof: {
      type: String,
      required: false,
    },
    durability: {
      type: String,
      required: false,
    },
    camera: {
      type: String,
      required: false,
    },
    lensType: {
      type: String,
      required: false,
    },
    displayType: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

export default mongoose.model("Cart", priceVariantSchema);
