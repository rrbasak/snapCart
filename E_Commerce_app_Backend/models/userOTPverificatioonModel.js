import mongoose from "mongoose";

const userOTPverificatioonSchema = mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: false,
  },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

export default mongoose.model("Userotpverificatioon", userOTPverificatioonSchema);
