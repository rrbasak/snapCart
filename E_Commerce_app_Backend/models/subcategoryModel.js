// import mongoose from "mongoose";

// const subcategorySchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   subcategory: {
//     category: { type: String, required: true },
//     metadata: [
//       {
//         brand: { type: String, required: true },
//         model: [
//           {
//             name: { type: String, required: true },
//             price: { type: Number, required: true },
//             damage: [
//               {
//                 type: { type: String, required: true },
//                 exchangePrice: { type: Number, required: true },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// });

// // Creating the model

// export default mongoose.model("Subcategory", subcategorySchema);




import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  sub_category: {
    type: mongoose.ObjectId,
    ref: "Sub_category",
    required: true,
  },
  subcategory: {
    category: { type: String, required: true },
    metadata: [
      {
        brand: { type: String, required: true },
        model: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            damage: [
              {
                type: { type: String, required: true },
                exchangePrice: { type: Number, required: true },
              },
            ],
          },
        ],
      },
    ],
  },
});

// Creating the model

export default mongoose.model("Subcategory", subcategorySchema);
