import mongoose from "mongoose";

const ramSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Productram", ramSchema);
