import mongoose from "mongoose";

const productSizeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Productsize", productSizeSchema);
