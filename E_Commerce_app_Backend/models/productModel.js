// import mongoose from 'mongoose';

// const productModel = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: mongoose.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     subcategory: {
//       type: mongoose.ObjectId,
//       ref: "Subcategory",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     photo: {
//       data: Buffer, //data--Buffer for docs
//       contentType: String,
//     },
//     shipping: {
//       type: Boolean,
//     },
//     search: {
//       type: String,
//       // required: true,
//     },
//   },
//   { timestamps: true }
// );

//  export default mongoose.model("Products", productModel);

import mongoose from "mongoose";
const priceVariantSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: [String],
      required: false,
    },
    storage: {
      type: [String],
      required: false,
    },
    color: {
      type: [String],
      required: false,
    },
    ram: {
      type: [String],
      required: false,
    },
    material: {
      type: [String],
      required: false,
    },
    style: {
      type: [String],
      required: false,
    },
    gender: {
      type: [String],
      // enum: ["Male", "Female"],
      required: false,
    },
    heel: {
      type: [String],
      required: false,
    },
    capacity: {
      type: [String],
      required: false,
    },
    waterproof: {
      type: [String],
      required: false,
    },
    durability: {
      type: [String],
      required: false,
    },
    cameraType: {
      type: [String],
      required: false,
    },
    lensType: {
      type: [String],
      required: false,
    },
    displayType: {
      type: [String],
      required: false,
    },
    processor: {
      type: [String],
      required: false,
    },
    connectivity: {
      type: [String],
      required: false,
    },
    noiseCancellation: {
      type: [String],
      required: false,
    },
    ageGroup: {
      type: [String],
      required: false,
    },
    weight: {
      type: [String],
      required: false,
    },
    batteryCapacity: {
      type: [String],
      required: false,
    },
    operatingSystem: {
      type: [String],
      required: false,
    },
    camera: {
      type: [String],
      required: false,
    },
    networkConnectivity: {
      type: [String],
      required: false,
    },
    graphicsCard: {
      type: [String],
      required: false,
    },
    ports: {
      type: [String],
      required: false,
    },
    type: {
      type: [String],
      required: false,
    },
    author: {
      type: [String],
      required: false,
    },
    genre: {
      type: [String],
      required: false,
    },
    language: {
      type: [String],
      required: false,
    },
    publisher: {
      type: [String],
      required: false,
    },
    pageCount: {
      type: [String],
      required: false,
    },
  },
  { _id: false }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.ObjectId,
      ref: "Subcategory",
      required: false,
      sparse: true,
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: [
      {
        data: Buffer, // Buffer to store image data
        contentType: String, // Content type of the image (e.g., 'image/jpeg')
      },
    ],
    // shipping: {
    //   type: Boolean,
    // },
    search: {
      type: [String],
      // required: true,
    },
    freedeliveryDate: {
      type: Date,
      // required: true,
    },
    fastestdelivery: {
      date: {
        type: Date,
      },
      closetime: {
        type: String,
      },
      // required: true,
    },
    availableInStock: {
      type: String,
      // enum: ["In Stock", "Out Of Stock"],
      // required: true,
    },
    specialDayTag: {
      type: String,
      // enum: ["yes", "no"],
      // required: true,
    },
    specialDayOffer: {
      type: Number,
      default: 0,
      required: false,
    },
    exchangeavailable: {
      type: String,
      // enum: ["yes", "no"],
    },
    primestartDate: {
      type: Date,
      required: false,
    },
    primeendDate: {
      type: Date,
      required: false,
    },
    reviews: [
      {
        type: mongoose.ObjectId,
        ref: "Review",
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    websitename: {
      type: String,
      required: false,
    },
    // ram: {
    //   type: mongoose.ObjectId,
    //   ref: "ProductRAM",
    // },
    // size: {
    //   type: mongoose.ObjectId,
    //   ref: "Productsize",
    // },
    // color: {
    //   type: mongoose.ObjectId,
    //   ref: "Productcolor",
    // },
    ram: [
      {
        type: String,
        // ref: "ProductRAM",
      },
    ],
    size: [
      {
        type: String,
        // ref: "Productsize",
      },
    ],
    color: [
      {
        type: String,
        // ref: "Productcolor",
      },
    ],

    // New fields for category-specific attributes:
    material: { type: String, required: false }, // Fashion
    style: { type: String, required: false }, // Fashion
    gender: { type: String, enum: ["Male", "Female"], required: false }, // Fashion
    ageGroup: { type: String, required: false }, // Kids' Fashion

    heelType: { type: String, required: false }, // Fashion (Shoes)
    weight: { type: String, required: false }, // Sports & Electronics

    capacity: { type: String, required: false }, // Outdoor Gear
    waterproof: { type: String, required: false }, // Outdoor Gear
    durability: { type: String, required: false }, // Outdoor Gear

    author: { type: String, required: false }, // Books
    genre: { type: String, required: false }, // Books
    language: { type: String, required: false }, // Books
    publisher: { type: String, required: false }, // Books
    pageCount: { type: String, required: false }, // Books
    publicationDate: { type: Date, required: false }, // Books

    rom: { type: String, required: false }, // Electronics
    processor: { type: String, required: false }, // Electronics
    batteryCapacity: { type: String, required: false }, // Electronics
    operatingSystem: { type: String, required: false }, // Electronics
    camera: { type: String, required: false }, // Electronics
    networkConnectivity: { type: String, required: false }, // Electronics
    storage: { type: String, required: false }, // Electronics
    graphicsCard: { type: String, required: false }, // Laptops
    ports: { type: String, required: false }, // Laptops
    type: { type: String, required: false }, // Laptops/Photography
    lensType: { type: String, required: false }, // Cameras
    connectivity: { type: String, required: false }, // Electronics
    displayType: { type: String, required: false }, // Cameras/Devices
    noiseCancellation: { type: String, required: false }, // Audio Devices
    cameraType: { type: String, required: false }, // Cameras
    priceVariants: [priceVariantSchema],
    publishdate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
