import mongoose from "mongoose";

const exchangeSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    damage: {
      type: [
        {
          damage_type: {
            type: String,
            required: true,
          },
          exchange_price: {
            type: Number, // Fixed typo here
            required: true,
          },
        },
      ],
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exchangeproduct", exchangeSchema); 
