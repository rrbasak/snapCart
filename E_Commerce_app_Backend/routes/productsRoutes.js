import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import multer from "multer"
// Set up storage and file filter for multer
const storage = multer.memoryStorage(); // Use memoryStorage to handle file buffers
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Set a limit for file size (10 MB)
});
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterCount,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  searchRelatedProductController,
  updateProductController,
  primeStartDayController,
  primeEndDayController,
  productAllPhotoController,
  filterProducts,
  getAllPrimeProductsController,
  getDummyOneProductsController,
  getDummySecProductsController,
  cancelOrderController,
  realtedPrevProductController,
} from "../controllers/productController.js";
const app = express();

const router = express.Router();

//create prodyct only by admin
// router.post(
//   "/create-product",
//   requireSignIn,
//   isAdmin,
//   formidable(),
//   createProductController
// );

// router.post("/create-product", requireSignIn, isAdmin, (req, res) => {
//   const form = formidable({
//     multiples: true, // To handle multiple files
//     uploadDir: "./uploads", // Directory to save files (adjust as needed)
//     keepExtensions: true, // Retain file extensions
//   });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res
//         .status(500)
//         .send({ success: false, message: "Error parsing files" });
//     }
//     try {
//       await createProductController(fields, files, res);
//     } catch (error) {
//       res
//         .status(500)
//         .send({ success: false, error, message: "Error in creating product" });
//     }
//   });
// });

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.array("photo"),
  createProductController
);
//update product only by admin
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  upload.array("photo"),
  updateProductController
);
//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//get single product photo
router.get("/product-photo/:pid", productPhotoController);

//get all product photo
router.get("/product-all-photo/:pid", productAllPhotoController);

//filter product
router.post("/product-filters", productFilterCount);

//product count
router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);
//product per page
router.get("/product-list", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//search product
router.get("/related-search/:keyword", searchRelatedProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);
//similar product
router.get("/related-prev-product/:pid/:cid", realtedPrevProductController);

//category wise product
router.get("/product-category/:cname/:subname", productCategoryController);

//payments routes
//accessToken
router.get("/braintree/accessToken", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//cancel order 
router.post("/remove-order", requireSignIn, cancelOrderController);



//prime start day
router.put("/prime-start", requireSignIn, isAdmin, primeStartDayController);

//prime end day
router.put("/prime-end", requireSignIn, isAdmin, primeEndDayController);

//product filters
router.post("/filter-products", filterProducts);
//exchange
// router.get("/exchange-product", getExchangeProductController);


//all prime day deal products
router.get("/all-prime-products", getAllPrimeProductsController);
//dummy products
router.get("/dummy-one-products", getDummyOneProductsController);
//dummy products
router.get("/dummy-sec-products", getDummySecProductsController);
export default router;
