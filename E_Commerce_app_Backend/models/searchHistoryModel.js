// import mongoose from "mongoose";

// const searchhistorySchema = new mongoose.Schema({
//   search: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   user: {
//     type: mongoose.ObjectId,
//     ref: "users",
//   },
// },{timestamps:true});

// export default mongoose.model("Searchhistory", searchhistorySchema);


import mongoose from "mongoose";

const searchhistorySchema = new mongoose.Schema(
  {
    search: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// Create a compound index to ensure that each user can only have one unique search
searchhistorySchema.index({ search: 1, user: 1 }, { unique: true });

export default mongoose.model("Searchhistory", searchhistorySchema);

