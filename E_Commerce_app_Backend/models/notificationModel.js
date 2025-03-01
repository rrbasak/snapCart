import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
      enum: ["admin", "users", "delivery_partner"],
    },
    recipientId: {
      type: mongoose.ObjectId,
      required: true,
      // refPath: "recipient", 
    },
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },
    type: {
      type: String,
      enum: [
        "order_update",
        "delivery_update",
        "new_offer",
        "user_message",
        "system",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
