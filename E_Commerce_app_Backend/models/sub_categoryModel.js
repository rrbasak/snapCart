import mongoose from "mongoose";

const sub_categorySchema = new mongoose.Schema({
  subname: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
    // default: "https://via.placeholder.com/50",
  },
});

export default mongoose.model("Sub_category", sub_categorySchema);
