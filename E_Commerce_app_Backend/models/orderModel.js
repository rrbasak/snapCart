import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // products: [
    //   {
    //     type: mongoose.ObjectId,
    //     ref: "Products",
    //   },
    // ],
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        orgprice: Number,
        quantity: Number,
        isprime: Boolean,
        isexchangeapplied: Boolean,
        productName: String,
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order Confirmed",
      // enum: ["Not Process", "Processing", "Shipped", "Delivered", "cancel"],
      enum: [
        "Order Confirmed",
        "Processed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Canceled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
