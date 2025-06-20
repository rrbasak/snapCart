import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import subcategoryModel from "../models/subcategoryModel.js";
import fs from "fs";
import slugify from "slugify";
import nodemailer from "nodemailer";

import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import cancelModel from "../models/cancelModel.js";
import sub_categoryModel from "../models/sub_categoryModel.js";
import userModel from "../models/userModel.js";
import userModelSocialMedia from "../models/userModelSocialMedia.js";
import sendEmail from "../utils/emailUtil.js";
import { generateOrderEmailContent } from "../templates/orderDetailEmailTemplate.js";
import { generateOrderShippedEmailContent } from "../templates/orderShippedEmailTemplate.js";
import { generateOrderBeforeDeliverEmailContent } from "../templates/orderBeforeDeliverEmailTemplate.js";
import { generateOrderAfterDeliverEmailContent } from "../templates/orderAfterDeliverEmailTemplate.js";
import { generateCancelByUserEmailContent } from "../templates/cancelByUserTemplate.js";
import formatTimestampforOrder from "../utils/dateUtlFoOrder.js";
import Fuse from "fuse.js";
// import formatTimestamp from "../client/src/frontendUtil/dateUtil.js";
// const formatTimestampforOrder = require("../client/src/frontendUtill/dateUtlFoOrder.js");

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MARCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// //Create Product
// export const createProductController = async (req, res) => {
//   //console.log("req", req.fields);
//   //console.log("files here dada",req.files);

//   try {
//     const {
//       name,
//       description,
//       price,
//       quantity,
//       category,
//       subcategory,
//       freedeliveryDate,
//       fastestdeliverydate,
//       fastestdeliverytime,
//       availableInStock,
//       search,
//       specialDayTag,
//       specialDayOffer,
//       isExchangeAvailable,
//       subcategoryName,
//     } = req.body;
//     const { photo } = req.files;
//     switch (true) {
//       case !name:
//         return res
//           .status(500)
//           .send({ success: false, message: "Name is Required" });
//       case !description:
//         return res.status(500).send({ message: "Description is Required" });
//       case !price:
//         return res.status(500).send({ message: "Price is Required" });
//       case !category:
//         return res.status(500).send({ message: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ message: "Quantity is Required" });
//       case photo && photo.size > 1000000000:
//         return res
//           .status(500)
//           .send({ message: "photo is Required and should be less then 1 GB" });
//       case !freedeliveryDate:
//         return res
//           .status(500)
//           .send({ message: "Free Derlivery Date is Required" });
//       case !fastestdeliverydate:
//         return res
//           .status(500)
//           .send({ message: "Fastest Derlivery Date is Required" });
//       case !fastestdeliverytime:
//         return res
//           .status(500)
//           .send({ message: "Fastest Derlivery Time is Required" });
//       case !availableInStock:
//         return res.status(500).send({ message: "Availability is Required" });
//       case !search:
//         return res
//           .status(500)
//           .send({ message: "Search input keys is Required" });
//       case !subcategoryName:
//         return res
//           .status(500)
//           .send({ message: "subcategory Name is Required" });
//     }

//     const products = await new productModel({
//       ...req.fields,
//       fastestdelivery: {
//         date: fastestdeliverydate,
//         closetime: fastestdeliverytime,
//       },
//       slug: slugify(name),
//     });
//     if (specialDayTag === "true") {
//       products.primestartDate = null;
//       products.primeendDate = null;
//     }
//     // if (photo) {
//     //   products.photo.data = fs.readFileSync(photo.path);
//     //   products.photo.contentType = photo.type;
//     // }

//     if (photo) {
//       products.photo = Array.isArray(photo)
//         ? photo.map((photo) => ({
//             data: fs.readFileSync(photo.path),
//             contentType: photo.type,
//           }))
//         : [
//             {
//               data: fs.readFileSync(photo.path),
//               contentType: photo.type,
//             },
//           ];
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in crearing product",
//     });
//   }
// };

//Create Product
export const createProductController = async (req, res) => {
  //console.log("req", req.body);
  //console.log("files here dada", req.files);

  try {
    const {
      name,
      brand,
      websitename,
      description,
      price,
      quantity,
      category,
      subcategory,
      freedeliveryDate,
      fastestdeliverydate,
      fastestdeliverytime,
      availableInStock,
      search,
      specialDayTag,
      specialDayOffer,
      isExchangeAvailable,
      subcategoryName,
      ram,
      size,
      color,
      priceVariants,
    } = req.body;
    const photos = req.files;
    // const parsedPriceVariants = typeof priceVariants === 'string' ? JSON.parse(priceVariants) : priceVariants;
    // const parsedPriceVariants = priceVariants ? JSON.parse(priceVariants) : [];
    // Parse priceVariants if it exists and is not empty
    let parsedPriceVariants = [];
    if (priceVariants) {
      try {
        parsedPriceVariants = JSON.parse(priceVariants);
        if (!Array.isArray(parsedPriceVariants)) {
          return res
            .status(500)
            .send({ message: "priceVariants should be an array" });
        }
      } catch (error) {
        return res.status(500).send({ message: "Error parsing priceVariants" });
      }
    }
    //console.log("parsedPriceVariants", parsedPriceVariants);
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name is Required" });
      case !brand:
        return res.status(500).send({ message: "Brand is Required" });
      case !websitename:
        return res.status(500).send({ message: "Brand url is Required" });
      case !description:
        return res.status(500).send({ message: "Description is Required" });
      case !price:
        return res.status(500).send({ message: "Price is Required" });
      case !category:
        return res.status(500).send({ message: "Category is Required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is Required" });
      case photos && photos.size > 1000000000:
        return res
          .status(500)
          .send({ message: "photo is Required and should be less then 1 GB" });
      case !freedeliveryDate:
        return res
          .status(500)
          .send({ message: "Free Derlivery Date is Required" });
      case !fastestdeliverydate:
        return res
          .status(500)
          .send({ message: "Fastest Derlivery Date is Required" });
      case !fastestdeliverytime:
        return res
          .status(500)
          .send({ message: "Fastest Derlivery Time is Required" });
      case !availableInStock:
        return res.status(500).send({ message: "Availability is Required" });
      case !search:
        return res
          .status(500)
          .send({ message: "Search input keys is Required" });
      case !subcategoryName:
        return res
          .status(500)
          .send({ message: "subcategory Name is Required" });
      case !parsedPriceVariants.length:
        return res.status(500).send({ message: "put a minimum combination" });
    }

    //console.log("parsedPriceVariants", parsedPriceVariants);
    const products = new productModel({
      ...req.body,
      priceVariants: parsedPriceVariants,
      fastestdelivery: {
        date: fastestdeliverydate,
        closetime: fastestdeliverytime,
      },
      slug: slugify(name),
      photo: photos.map((photo) => ({
        data: photo.buffer,
        contentType: photo.mimetype,
      })),
    });
    if (specialDayTag === "true") {
      products.primestartDate = null;
      products.primeendDate = null;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      //   .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
      .populate("subcategory")
      .populate("reviews");
    if (!product) {
      // If no product is found, return a 404 response with success as false
      return res.status(404).send({
        success: false,
        message: "Product not found",
        product: null,
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.deleteOne({ _id: req.params.pid }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  console.log("updating product photo", req.files);
  console.log("updating product fields", req.body);
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      fastestdeliverydate,
      fastestdeliverytime,
    } = req.body;
    const photos = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photos && photos.size > 1000000000:
        return res
          .status(500)
          .send({ message: "photo is Required and should be less then 1 GB" });
    }
    const existingProduct = await productModel.findById(req.params.pid);
    if (!existingProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    const updatedPhotos =
      photos.length > 0
        ? photos.map((photo) => ({
            data: photo.buffer,
            contentType: photo.mimetype,
          }))
        : existingProduct.photo;
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.body,
        fastestdelivery: {
          date: fastestdeliverydate,
          closetime: fastestdeliverytime,
        },
        slug: slugify(name),
        photo: updatedPhotos,
      },
      { new: true }
    );
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    //console.log("here is error", error);
    res.status(500).send({
      success: false,
      error: error,
      message: "Error in Updte product",
    });
  }
};

// get photo
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel
//       .findById({ _id: req.params.pid })
//       .select("photo");
//     if (product.photo.data) {
//       res.set("Content-type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     }
//   } catch (error) {
//     ////console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo"); // Select the 'photos' array

    if (product && product.photo && product.photo.length > 0) {
      const firstPhoto = product.photo[0]; // Get the first photo
      res.set("Content-Type", firstPhoto.contentType);
      return res.status(200).send(firstPhoto.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "No photos found for this product",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
//get all photos of a product
export const productAllPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo"); // Select the 'photos' array

    if (product && product.photo && product.photo.length > 0) {
      // Send all photos in response
      const photos = product.photo.map((photo) => ({
        contentType: photo.contentType,
        data: photo.data.toString("base64"), // Encode to base64 for transmission
      }));
      res.status(200).send({
        success: true,
        photos: photos,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No photos found for this product",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photos",
      error,
    });
  }
};

//filters
export const productFilterCount = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    // const query = {
    //   ...(checked.length > 0 && { category: { $in: checked } }),
    //   ...(radio.length === 2 && { price: { $gte: radio[0], $lte: radio[1] } }),
    // };

    // const products = await productModel.find({
    //   category: { $in: checked },
    //   price: { $gte: radio[0], $lte: radio[1] },
    // });

    // const products = await productModel.find({
    //   category: checked,
    //   price: { $and: [{ $gte: radio[0] }, { $lte: radio[1] }] },
    // });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
// export const productListController = async (req, res) => {
//   try {
//     const perPage = 6;
//     const page = req.params.page ? req.params.page : 1;
//     const products = await productModel
//       .find({})
//       .select("-photo")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     ////console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "error in per page ctrl",
//       error,
//     });
//   }
// };

// all product list
export const productListController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// // search product
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const resutls = await productModel
//       .find({
//         $or: [
//           { name: { $regex: keyword, $options: "i" } },
//           { description: { $regex: keyword, $options: "i" } },
//         ],
//       })
//       .select("-photo");
//     res.json(resutls);
//     //console.log("result",resutls);
//   } catch (error) {
//     ////console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

// // // asol demo search product
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const resutls = await productModel
//       .find({ search: { $regex: keyword, $options: "i" } })
//       .select("-photo");
//     res.json(resutls);
//     //console.log("result",resutls);
//   } catch (error) {
//     ////console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

// new search product
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const regex = new RegExp(keyword, "i");
//     const results = await productModel
//       .find({ search: regex })
//       .select("-photo");
//     //console.log("results", results);
//     const uniqueResults = Array.from(
//       new Set(
//         results.map((product) => {
//           const terms = product.search[0].split(/,\s*/);
//           const matches = terms.filter((term) => regex.test(term));
//           product.search.find((term) => term.toLowerCase().includes(matches));
//         })
//       )
//     ).map((search) =>
//       results.find((product) => product.search.includes(search))
//     );

//     res.json(uniqueResults);
//     //console.log("uniqueResults", uniqueResults);
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };
// seaqrch filter controller
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const regex = new RegExp(`^${keyword}`, "i");
//     //console.log("regex", regex);
//     //fuzzy logic for search optimizations
//     const options = {
//       includeScore: true,
//     };

//     // Find all products
//     const results = await productModel.find({}).select("-photo");

//     //console.log("results111", results);

//     // Extract and filter search terms
//     const matchingTerms = results.flatMap((product) => {
//       // Split the search terms by comma and filter
//       const terms = product.search[0].split(/,\s*/);
//       //console.log("termsssss123", terms);
//       const fuse = new Fuse(terms, options);
//       const result = fuse.search(keyword);
//       //console.log("result12345", result);
//       return terms
//         .filter((term) => regex.test(term))
//         .map((term) => ({
//           ...product.toObject(),
//           matchedTerm: term, // Include matched term
//         }));
//     });

//     // Ensure unique products but allow duplicate terms if needed
//     const uniqueResults = [];
//     const seenTerms = new Set();

//     //console.log("matchingTerms11111", matchingTerms);
//     matchingTerms.forEach(({ _id, matchedTerm }) => {
//       if (!seenTerms.has(matchedTerm)) {
//         seenTerms.add(matchedTerm);
//         uniqueResults.push({
//           _id, // Include only necessary fields
//           matchedTerm,
//         });
//       }
//     });

//     res.json(uniqueResults);
//     //console.log("uniqueResults111", uniqueResults); // Check unique results
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const regex = new RegExp(`^${keyword}`, "i");
    //console.log("regex", regex);

    // Fuzzy search options
    const options = {
      includeScore: true,
      threshold: 0.4, // Adjust as needed
    };

    // Find all products
    const results = await productModel.find({}).select("-photo");

    //console.log("results111", results);

    // Extract and filter search terms
    const matchingTerms = results.flatMap((product) => {
      // Split the search terms by comma and filter
      const terms = product.search[0].split(/,\s*/);
      //console.log("termsssss123", terms);

      const fuse = new Fuse(terms, options);
      const result = fuse.search(keyword);
      //console.log("result12345", result);

      // Map through the result to get the matched terms
      return result.map(({ item, score }) => ({
        ...product.toObject(),
        matchedTerm: item, // The matched term from Fuse result
        score, // Optional: Include score if you need it
      }));
    });

    // Ensure unique products but allow duplicate terms if needed
    const uniqueResults = [];
    const seenTerms = new Set();

    //console.log("matchingTerms11111", matchingTerms);
    matchingTerms.forEach(({ _id, matchedTerm }) => {
      if (!seenTerms.has(matchedTerm)) {
        seenTerms.add(matchedTerm);
        uniqueResults.push({
          _id, // Include only necessary fields
          matchedTerm,
        });
      }
    });

    res.json(uniqueResults);
    //console.log("uniqueResults111", uniqueResults); // Check unique results
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// seaqrch filter controller using fuse.js
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const regex = new RegExp(`^${keyword}`, "i");
//     //console.log("regex", regex);

//     // Fuzzy search options
//     const options = {
//       includeScore: true, // Includes the score in the results
//       // Adjust the threshold as needed (0.0 = exact match, 1.0 = match anything)
//       keys: ["search[0]"], // Specify the fields in the product to be searched
//     };

//     // Find all products
//     const results = await productModel.find({}).select("-photo");

//     //console.log("results111", results);

//     // Initialize Fuse with the list of terms
//     const fuse = new Fuse(results, options);

//     // Perform fuzzy search on the product search terms
//     const fuzzyResults = fuse.search(keyword);
//     //console.log("fuzzyResults", fuzzyResults);

//     // Map fuzzy results to match the required structure
//     const matchingTerms = fuzzyResults.map(({ item, score }) => {
//       return {
//         ...item,
//         matchedTerm: item.search[0], // Include the matched term
//         score, // Optionally include the score for debugging or sorting
//       };
//     });

//     // Ensure unique products but allow duplicate terms if needed
//     const uniqueResults = [];
//     const seenTerms = new Set();

//     //console.log("matchingTerms11111", matchingTerms);
//     matchingTerms.forEach(({ _id, matchedTerm }) => {
//       if (!seenTerms.has(matchedTerm)) {
//         seenTerms.add(matchedTerm);
//         uniqueResults.push({
//           _id, // Include only necessary fields
//           matchedTerm,
//         });
//       }
//     });

//     res.json(uniqueResults);
//     //console.log("uniqueResults111", uniqueResults); // Check unique results
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

// //sec new one
// export const searchProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const regex = new RegExp(keyword, "i");

//     // Find products where any element in the search string matches the keyword
//     const products = await productModel
//       .find({ search: regex })
//       .select("-photo");
//     //console.log("products", products);

//     // const uniqueResults = Array.from(
//     //   new Set(
//     //     products.map((product) => {
//     //       const terms = product.search[0].split(/,\s*/);
//     //       const matches = terms.filter((term) => regex.test(term));
//     //       product.search.find((matches) =>
//     //         matches.toLowerCase().includes(matches)
//     //       );
//     //     })
//     //   )
//     // ).map((search) =>
//     //   products.find((product) => product.search.includes(search))
//     // );
//     let matchingTerms = [];

//     products.forEach((product) => {

//       const terms = product.search[0].split(/,\s*/);
//       const matches = terms.filter((term) => regex.test(term));
//       matchingTerms.push(...matches);
//     });

//     // Remove duplicates by using a Set
//     //console.log("matchingTerms", matchingTerms);
//     const uniqueMatches = [...new Set(matchingTerms)];

//     res.json(uniqueMatches);
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

// // related search products
// export const searchRelatedProductController = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const resutls = await productModel
//       .find({ search: { $regex: keyword, $options: "i" } })
//       .select("-photo");

//     res.json(resutls);
//     //console.log("result 2 ", resutls);
//   } catch (error) {
//     //console.log("1234error", error);
//     res.status(400).send({
//       success: false,
//       message: "Error In Search Product API",
//       error,
//     });
//   }
// };

// related search products using fusy.js
export const searchRelatedProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Find all products without initial filtering
    const allProducts = await productModel
      .find({})
      .populate("reviews")
      .select("-photo");

    //console.log("allProducts", allProducts);

    // Set up Fuse.js options
    // (more strict) search
    const optionsStrict = {
      keys: ["search"],
      threshold: 0.3,
      includeScore: true,
      distance: 50, // Lower distance for closer matches
      minMatchCharLength: 3, // Only match if at least 3 chars match
    };

    // (less strict) search
    const optionsLenient = {
      keys: ["search"],
      threshold: 0.5,
      distance: 100,
      minMatchCharLength: 3,
      includeScore: true,
    };

    // Create a new Fuse instance with all products
    const Strictfuse = new Fuse(allProducts, optionsStrict);
    const Lenientfuse = new Fuse(allProducts, optionsLenient);

    // Perform fuzzy search using Fuse.js
    const StrictfuseResults = Strictfuse.search(keyword);
    const LenientfuseResults = Lenientfuse.search(keyword);

    // Map Fuse.js results to get the item with additional properties if needed
    const StrictrefinedResults = StrictfuseResults.map(({ item }) => ({
      ...item._doc, // Include the full product object
    }));
    const LenientrefinedResults = LenientfuseResults.map(({ item }) => ({
      ...item._doc, // Include the full product object
    }));

    //console.log("StrictrefinedResults", StrictrefinedResults);
    //console.log("LenientrefinedResults", LenientrefinedResults);
    // res.json(
    //   StrictrefinedResults.length === 0
    //     ? LenientrefinedResults
    //     : StrictrefinedResults
    // );
    const refinedResults =
      StrictrefinedResults.length > 0
        ? StrictrefinedResults
        : LenientrefinedResults;

    res.json(refinedResults);

    //console.log("refinedResults", refinedResults); // Check refined results
  } catch (error) {
    //console.log("Error in searchRelatedProductController", error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      // .limit(3)
      .populate("category")
      .skip(skip)
      .limit(parseInt(limit));
    // res.status(200).send({
    //   success: true,
    //   products,
    // });
    const total = await productModel.countDocuments({
      category: cid,
      _id: { $ne: pid },
    });

    res.status(200).send({
      success: true,
      products,
      total,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
// similar products
export const realtedPrevProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      // .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// // get prdocyst by catgory
// export const productCategoryController = async (req, res) => {
//   try {
//     const category = await categoryModel.findOne({ slug: req.params.slug });
//     //console.log("category", category);
//     const products = await productModel
//       .find({ category: category })
//       .populate("category")
//       .populate("subcategory");
//     //console.log("products", products);
//     res.status(200).send({
//       success: true,
//       category,
//       products,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(400).send({
//       success: false,
//       error,
//       message: "Error While Getting products",
//     });
//   }
// };

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  const { cname, subname } = req.params;
  try {
    const category = await categoryModel.findOne({ _id: cname });
    //console.log("category here", category);
    const products = await productModel
      .find({ $and: [{ category: cname }, { subcategoryName: subname }] })
      .populate("category")
      .populate("subcategory")
      .populate("reviews");
    //console.log("products", products);
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//accessToken
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    //console.log("hello", error);
  }
};

//payment
// export const brainTreePaymentController = async (req, res) => {
//   try {
//     const { nonce, cart, updatedPrice, isQuantityUpdated, quantity } = req.body;
//     //console.log("cart 200", cart);
//     //console.log("updatedPrice 200", updatedPrice);
//     const userFromModel = await userModel.findOne({ _id: req.user._id });
//     const userFromSocialMediaModel = await userModelSocialMedia.findOne({
//       _id: req.user._id,
//     });

//     const emailUserModel = userFromModel ? userFromModel.email : null;
//     const emailUserModelSocialMedia = userFromSocialMediaModel
//       ? userFromSocialMediaModel.email
//       : null;

//     const nameUserModel = userFromModel ? userFromModel.name : null;
//     const nameUserModelSocialMedia = userFromSocialMediaModel
//       ? userFromSocialMediaModel.name
//       : null;

//     const addressUserModel = userFromModel ? userFromModel.address : null;
//     const addressUserModelSocialMedia = userFromSocialMediaModel
//       ? userFromSocialMediaModel.address
//       : null;

//     let total = 0;
//     cart.map((i) => {
//       total += i.orgprice * i.quantity;
//     });
//     cart.forEach((item) => {
//       const itemQuantity = isQuantityUpdated[item._id]
//         ? quantity[item._id]
//         : item.quantity;

//       total += item.orgprice * itemQuantity;
//     });

//     //console.log("Total", total);
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: updatedPrice,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       async function (error, result) {
//         if (result) {
//           const order = await new orderModel({
//             products: cart.map((c) => ({
//               product: c.product._id,
//               orgprice: c.orgprice,
//               quantity: isQuantityUpdated[c._id] ? quantity[c._id] : c.quantity,
//               isprime: c.isprime,
//               isexchangeapplied: c.isexchangeapplied,
//             })),
//             payment: result,
//             buyer: req.user._id,
//           }).save();

//           // // Update product quantities
//           // await Promise.all(
//           //   cart.map(async (item) => {
//           //     const updatedQuantity = isQuantityUpdated[item._id]
//           //       ? quantity[item._id]
//           //       : item.quantity;

//           //     await productModel.findByIdAndUpdate(item.product._id, {
//           //       $inc: { quantity: -updatedQuantity },
//           //     });
//           //   })
//           // );
//           // //console.log("emailUserModel", emailUserModel);
//           // //console.log("emailUserModelSocialMedia", emailUserModelSocialMedia);
//           const recipientEmail = emailUserModel || emailUserModelSocialMedia;
//           const recipientName = nameUserModel || nameUserModelSocialMedia;
//           const recipientAddress =
//             addressUserModel || addressUserModelSocialMedia;
//           //console.log("free", cart[0]?.product?.freedeliveryDate);
//           if (recipientEmail) {
//             const orderDetails = {
//               customerName: recipientName,
//               orderId: order._id.toString(),
//               arrivalDate: formatTimestampforOrder(
//                 cart[0]?.product?.freedeliveryDate
//               ),
//               shippingSpeed: "Delivery",
//               recipientName: recipientName,
//               address: recipientAddress,
//               itemSubtotal: total.toFixed(2),
//               orderTotal: total.toFixed(2),
//             };
//             const emailContent = generateOrderEmailContent(
//               orderDetails,
//               cart,
//               updatedPrice
//             );
//             // const emailContent = generateOrderShippedEmailContent(orderDetails);
//             // const emailContent = generateOrderBeforeDeliverEmailContent(orderDetails);
//             // const emailContent = generateOrderAfterDeliverEmailContent(orderDetails);

//             await sendEmail({
//               service: "gmail",
//               to: recipientEmail,
//               subject: "Order Confirmation",
//               html: emailContent,
//             });
//           }

//           // Update product quantity and stock status
//           for (const item of cart) {
//             const product = await productModel.findById(item.product._id);
//             if (product) {
//               const newQuantity =
//                 product.quantity -
//                 (isQuantityUpdated[item._id]
//                   ? quantity[item._id]
//                   : item.quantity);
//               product.quantity = newQuantity;
//               // Ensure quantity does not go below 0
//               if (newQuantity < 0) {
//                 newQuantity = 0;
//               }

//               product.quantity = newQuantity;

//               // Update stock status
//               if (newQuantity === 0) {
//                 product.availableInStock = "Out Of Stock";
//                 return response.status(500).json({
//                   success: true,
//                   message: "Payment Completed Successfully",
//                 });
//               }

//               await product.save();
//             }
//           }

//           // res.json({ ok: true });
//           res.status(200).json({
//             success: true,
//             message: "Payment Completed Successfully",
//           });
//         } else {
//           // res.status(500).send(error);
//           res.status(500).json({
//             success: false,
//             message: "Failed to payment",
//             error: error.message,
//           });
//         }
//       }
//     );
//   } catch (error) {
//      res.status(500).json({
//        success: false,
//        message: "Failed to payment",
//        error: error.message,
//      });
//   }
// };
//payment

export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, updatedPrice, isQuantityUpdated, quantity } = req.body;

    //console.log("cart 200", cart);
    //console.log("updatedPrice 200", updatedPrice);
    const userFromModel = await userModel.findOne({ _id: req.user._id });
    const userFromSocialMediaModel = await userModelSocialMedia.findOne({
      _id: req.user._id,
    });

    const emailUserModel = userFromModel ? userFromModel.email : null;
    const emailUserModelSocialMedia = userFromSocialMediaModel
      ? userFromSocialMediaModel.email
      : null;

    const nameUserModel = userFromModel ? userFromModel.name : null;
    const nameUserModelSocialMedia = userFromSocialMediaModel
      ? userFromSocialMediaModel.name
      : null;

    const addressUserModel = userFromModel ? userFromModel.address : null;
    const addressUserModelSocialMedia = userFromSocialMediaModel
      ? userFromSocialMediaModel.address
      : null;

    let total = 0;

    // Check if required quantity is available
    for (const item of cart) {
      const product = await productModel.findById(item.product._id);

      if (
        !product ||
        product.quantity <
          (isQuantityUpdated[item._id] ? quantity[item._id] : item.quantity)
      ) {
        return res.status(400).json({
          success: false,
          error: `Out Of Stock for ${item.product.name}`,
        });
      }

      // Calculate total price
      const itemQuantity = isQuantityUpdated[item._id]
        ? quantity[item._id]
        : item.quantity;
      total += item.orgprice * itemQuantity;
    }

    // Reserve the product quantity
    await Promise.all(
      cart.map(async (item) => {
        const product = await productModel.findById(item.product._id);
        const reservedQuantity = isQuantityUpdated[item._id]
          ? quantity[item._id]
          : item.quantity;

        product.quantity -= reservedQuantity;

        // Ensure quantity does not go below 0
        if (product.quantity < 0) {
          product.quantity = 0;
        }

        // Update stock status if out of stock
        if (product.quantity === 0) {
          product.availableInStock = "Out Of Stock";
        }

        await product.save();
      })
    );

    // Set a timer to revert quantities after 2 minutes if payment is not completed
    const timer = setTimeout(async () => {
      await Promise.all(
        cart.map(async (item) => {
          const product = await productModel.findById(item.product._id);
          const revertedQuantity = isQuantityUpdated[item._id]
            ? quantity[item._id]
            : item.quantity;
          product.quantity += revertedQuantity;

          // Update stock status if product is back in stock
          if (product.quantity > 0) {
            product.availableInStock = "In Stock";
          }

          await product.save();
        })
      );

      res.status(408).json({
        success: false,
        error: "Payment timeout, quantities have been reverted",
      });
    }, 120000); // 2 minutes timer
    // Proceed with payment
    gateway.transaction.sale(
      {
        amount: updatedPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result.success) {
          clearTimeout(timer);
          // Payment succeeded, create the order
          const order = await new orderModel({
            products: cart.map((c) => ({
              product: c.product._id,
              orgprice: c.orgprice,
              quantity: isQuantityUpdated[c._id] ? quantity[c._id] : c.quantity,
              isprime: c.isprime,
              isexchangeapplied: c.isexchangeapplied,
              productName: c.name,
            })),
            payment: result,
            buyer: req.user._id,
            email: emailUserModel || emailUserModelSocialMedia,
          }).save();

          // Send order confirmation email (optional)
          // Code for sending email
          const recipientEmail = emailUserModel || emailUserModelSocialMedia;
          const recipientName = nameUserModel || nameUserModelSocialMedia;
          const recipientAddress =
            addressUserModel || addressUserModelSocialMedia;
          //console.log("free", cart[0]?.product?.freedeliveryDate);
          if (recipientEmail) {
            const orderDetails = {
              customerName: recipientName,
              orderId: order._id.toString(),
              arrivalDate: formatTimestampforOrder(
                cart[0]?.product?.freedeliveryDate
              ),
              shippingSpeed: "Delivery",
              recipientName: recipientName,
              address: recipientAddress,
              itemSubtotal: total.toFixed(2),
              orderTotal: total.toFixed(2),
            };
            const emailContent = generateOrderEmailContent(
              orderDetails,
              cart,
              updatedPrice
            );
            // const emailContent = generateOrderShippedEmailContent(orderDetails);
            // const emailContent = generateOrderBeforeDeliverEmailContent(orderDetails);
            // const emailContent = generateOrderAfterDeliverEmailContent(orderDetails);

            await sendEmail({
              service: "gmail",
              to: recipientEmail,
              subject: "Order Confirmation",
              html: emailContent,
            });
          }

          // res.json({ ok: true });
          res.status(200).json({
            success: true,
            message: "Payment Completed Successfully",
            cart,
          });
        } else {
          clearTimeout(timer);
          // Payment failed, revert the reserved quantities
          await Promise.all(
            cart.map(async (item) => {
              const product = await productModel.findById(item.product._id);
              const revertedQuantity = isQuantityUpdated[item._id]
                ? quantity[item._id]
                : item.quantity;
              product.quantity += revertedQuantity;

              // Update stock status if product is back in stock
              if (product.quantity > 0) {
                product.availableInStock = "In Stock";
              }

              await product.save();
            })
          );

          res.status(500).json({
            success: false,
            error: "Payment failed, please try again",
          });
        }
      }
    );
  } catch (error) {
    console.log("Error processing payment:", error);
    res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

// //exchange product get controller
// export const getExchangeProductController = async (req, res) => {
//   try {

//   } catch (error) {
//     //console.log(error);
//     res.status(400).send({
//       success: false,
//       error: error,
//       message: "Error While Getting products",
//     });
//   }
// }

//prime start day controller
// export const primeStartDayController = async (req, res) => {
//   const { primestartDate, primeendDate } = req.body;

//   try {
//     const products = await productModel.updateMany(
//       { specialDayTag: "true" },
//       {
//         $set: {
//           primestartDate,
//           primeendDate,
//         },
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Prime Day started successfully for all applicable products",
//       updatedProductsCount: products.modifiedCount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to start Prime Day",
//       error: error.message,
//     });
//   }
// };
export const primeStartDayController = async (req, res) => {
  const { primestartDate, primeendDate } = req.body;

  try {
    const activePrimeDay = await productModel.findOne({
      specialDayTag: "true",
      primestartDate: { $lte: new Date() },
      primeendDate: { $gte: new Date() },
    });
    console.log("activePrimeDay1", activePrimeDay);
    if (activePrimeDay) {
      return res.status(400).json({
        success: false,
        message: "Prime Day is already active.",
      });
    }

    const products = await productModel.updateMany(
      { specialDayTag: "true" },
      {
        $set: {
          primestartDate,
          primeendDate,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Prime Day activated successfully",
      updatedProductsCount: products.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to start Prime Day",
      error: error.message,
    });
  }
};

//prime end day controller
// export const primeEndDayController = async (req, res) => {
//   const { primestartDate, primeendDate } = req.body;

//   try {
//     const products = await productModel.updateMany(
//       { specialDayTag: "true" },
//       {
//         $unset: {
//           primestartDate: "",
//           primeendDate: "",
//         },
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Prime Day ended successfully!",
//       updatedProductsCount: products.modifiedCount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to end Prime Day",
//       error: error.message,
//     });
//   }
// };
export const primeEndDayController = async (req, res) => {
  try {
    const activePrimeDay = await productModel.findOne({
      specialDayTag: "true",
      primestartDate: { $lte: new Date() },
      primeendDate: { $gte: new Date() },
    });
    console.log("activePrimeDay2", activePrimeDay);
    if (!activePrimeDay) {
      return res.status(400).json({
        success: false,
        message: "No active Prime Day to end.",
      });
    }

    const products = await productModel.updateMany(
      { specialDayTag: "true" },
      {
        $unset: {
          primestartDate: "",
          primeendDate: "",
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Prime Day ended successfully!",
      updatedProductsCount: products.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to end Prime Day",
      error: error.message,
    });
  }
};

//product filters controller
export const filterProducts = async (req, res) => {
  try {
    const {
      brands,
      colors,
      rams,
      sizes,
      priceRange,
      rating,
      category,
      subcategory,
    } = req.body;
    //console.log("here mr", req.body);
    let query = {};

    if (category && category.length > 0) {
      query.category = { $in: category };
    }

    if (subcategory && subcategory.length > 0) {
      // const existingSubCategory = await sub_categoryModel.findOne({
      //   subname: subcategory,
      // });
      // //console.log("existingSubCategory1212", existingSubCategory);
      query.subcategoryName = { $in: subcategory };
    }

    if (brands && brands.length > 0) {
      query.brand = { $in: brands };
    }

    if (colors && colors.length > 0) {
      query.color = { $in: colors.map((c) => new RegExp(c, "i")) };
    }

    if (rams && rams.length > 0) {
      query.ram = { $in: rams.map((r) => new RegExp(r, "i")) };
    }

    if (sizes && sizes.length > 0) {
      query.size = { $in: sizes.map((s) => new RegExp(s, "i")) };
    }

    if (priceRange && priceRange.length > 0) {
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    if (rating) {
      const review = await reviewModel.find({
        rating: { $gte: rating },
      });
      query["reviews.rating"] = { $gte: rating };
    }

    //console.log("query", query);
    const products = await productModel.find(query).populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPrimeProductsController = async (req, res) => {
  try {
    const products = await productModel.find({
      $and: [
        { specialDayTag: "true" },
        { primestartDate: { $exists: true, $ne: null } },
        { primeendDate: { $exists: true, $ne: null } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Fetched all Prime Day products successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all Prime Day products",
      error: error.message,
    });
  }
};

//dummy products list
export const getDummyOneProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({
        category: "66a00a2891bb31a3e16d1c2a",
        _id: { $ne: "66c6b882c46be8b02893a516" },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
//dummy products list
export const getDummySecProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({
        category: "6672ad695240c0ee7ad73fee",
        _id: { $ne: "669cb4b80577734126b9db79" },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

//cancel order controller
export const cancelOrderController = async (req, res) => {
  const { oid, userId, reason, buyerName, status, email } = req.body;
  //console.log("hi", req.body);
  try {
    const deletedOrder = await orderModel.findOneAndDelete({
      _id: oid,
      buyer: userId,
      status: { $ne: "Delivered" },
    });

    if (!deletedOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found or already delivered",
      });
    } else {
      const cancelOrder = await cancelModel({
        userId: userId,
        orderId: oid,
        reason,
      }).save();
      //canceled by user
      const orderDetails = {
        customerName: buyerName,
        orderId: oid,
        orderStatus: status,
      };
      const emailContent = generateCancelByUserEmailContent(orderDetails);

      await sendEmail({
        service: "gmail",
        to: email,
        subject: `🔔 Your Snapcart.in Order ${oid.toString()} Has Been Canceled as Requested`,
        html: emailContent,
      });
      res.status(200).send({
        success: true,
        message: "Order cancelled successfully",
        deletedOrder,
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while cancelling the order",
      error,
    });
  }
};
