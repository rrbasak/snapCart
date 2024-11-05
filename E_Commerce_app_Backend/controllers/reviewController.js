import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

// add review
// export const addReviewControlller = async (req, res) => {
//   //console.log("req", req.body);
//   try {
//     const { product, user, username, rating, comment } = req.body;
//     const userData = await userModel.findById(user).select("photo");
//     const review = new reviewModel({
//       product,
//       user,
//       username,
//       rating,
//       comment,
//       userPhoto: userData.photo,
//     });

//     const savedReview = await review.save();
//     const reproduct = await productModel.findById(product);
//     reproduct.reviews.push(savedReview._id);
//     await reproduct.save();
//     // const review = await reviewModel({
//     //   ...req.body,
//     // }).save();
//     // //console.log(review);
//     res.status(200).send({
//       success: true,
//       messsage: "Review submitted successfully!",
//       review,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while creating cart",
//       error: error,
//     });
//   }
// };
// get review on a product
// export const getReviewControlller = async (req, res) => {
//   try {
//     const { pid } = req.params;
//     //console.log(pid);
//     const review = await reviewModel
//       .find({
//         product: pid,
//       })
//       .sort({ createdAt: -1 });
//     //console.log(review);
//     res.status(200).send({
//       success: true,
//       messsage: "Review Getting successfully",
//       review,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting review",
//       error: error,
//     });
//   }
// };

export const addReviewControlller = async (req, res) => {
  try {
    const { product, user, username, rating, comment, order } = req.body;

    const userInfo = await userModel.findById(user).select("photo");

    const userPhoto = userInfo.photo?.data
      ? {
          data: userInfo.photo.data,
          contentType: userInfo.photo.contentType,
        }
      : {
          url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        };

    // const orders = await orderModel.find({
    //   buyer: user,
    //   "products.product": product,
    //   status: "deliverd",
    // });
    // //console.log("orders here", orders);
    // if (orders.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "You can only review products that you have ordered and received.",
    //   });
    // }

    const review = new reviewModel({
      product,
      user,
      username,
      rating,
      comment,
      userPhoto: userPhoto,
      order,
    });

    const savedReview = await review.save();

    const reproduct = await productModel.findById(product);
    await reproduct.reviews.push(savedReview._id);
    await reproduct.save();

    res.status(200).send({
      success: true,
      message: "Review submitted successfully!",
      review: savedReview,
    });
  } catch (error) {
    //console.log("this error", error);
    res.status(500).send({
      success: false,
      message: "Error while submitting review",
      error: error,
    });
  }
};
export const getReviewControlller = async (req, res) => {
  try {
    const { pid } = req.params;
    const reviews = await reviewModel
      .find({ product: pid })
      .sort({ createdAt: -1 });

    const reviewsWithPhotos = reviews.map((review) => {
      if (review.userPhoto?.data) {
        return {
          ...review.toObject(),
          userPhoto: {
            data: review.userPhoto.data,
            contentType: review.userPhoto.contentType,
          },
        };
      } else if (review.userPhoto?.url) {
        return {
          ...review.toObject(),
          userPhoto: {
            url: review.userPhoto.url,
          },
        };
      } else {
        return review.toObject();
      }
    });

    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      reviews: reviewsWithPhotos,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting reviews",
      error: error,
    });
  }
};

//get number of review
export const getReviewLengthControlller = async (req, res) => {
  try {
    const { pid } = req.params;
    const review = await reviewModel.find({
      product: pid,
    });
    //console.log(review);

    res.status(200).send({
      success: true,
      messsage: "Number of Reviews Getting successfully",
      reviewLength: review.length,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting review size",
      error: error,
    });
  }
};
// delete review on a product
export const deleteReviewController = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await reviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    await productModel.findByIdAndUpdate(
      deletedReview.product,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    const remainingReviews = await reviewModel.find({
      product: deletedReview.product,
    });

    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      reviews: remainingReviews,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting review",
      error: error.message,
    });
  }
};

// check if user can review product
// export const canReviewController = async (req, res) => {
//   try {
//     const { uid, pid,oid } = req.params;

//     //console.log("uid",typeof(uid))
//     //console.log("pid",pid)
//     if (uid==="undefined") {
//       return res
//         .status(200)
//         .json({ success: false, message: "User ID is missing" });
//     }

//     // if (!pid) {
//     //   return res
//     //     .status(200)
//     //     .json({ success: false, message: "Product ID is missing" });
//     // }

//     else{
//       const orders = await orderModel.find({
//         buyer: uid,
//         "products.product": pid,
//         status: "Delivered",
//       });

//       if (orders.length > 0) {
//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(200).json({ success: false });
//       }
//     }

//   } catch (error) {
//     console.error("Error checking review eligibility:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// Check if user is eligible to review a product
export const canReviewController = async (req, res) => {
  try {
    const { uid, pid, oid } = req.params;
    const productDetails = await productModel.findById(pid);
    if (uid === "undefined" || !pid || !oid) {
      return res.status(400).json({
        success: false,
        message: "User ID, Product ID, or Order ID is missing",
        productDetails,
      });
    }

    const order = await orderModel.findOne({
      _id: oid,
      buyer: uid,
      status: "Delivered",
      "products.product": pid,
    });

    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not delivered or product not found.",
        productDetails,
      });
    }

    const existingReview = await reviewModel.findOne({
      order: oid,
      user: uid,
      product: pid,
    });

    if (existingReview) {
      return res.status(200).json({
        success: false,
        message: "Review already exists for this product.",
        productDetails,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User is eligible to review the product.",
      productDetails,
    });
  } catch (error) {
    console.error("Error checking review eligibility:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//get a particular review based on pid,oid,uid
export const getparticularReviewByPOUControlller = async (req, res) => {
  try {
    const { pid, oid, uid } = req.params;
    const review = await reviewModel.find({
      product: pid,
      order: oid,
      user: uid,
    });

    const reviewWithPhoto = review.map((review) => {
      if (review.userPhoto?.data) {
        return {
          ...review.toObject(),
          userPhoto: {
            data: review.userPhoto.data,
            contentType: review.userPhoto.contentType,
          },
        };
      } else if (review.userPhoto?.url) {
        return {
          ...review.toObject(),
          userPhoto: {
            url: review.userPhoto.url,
          },
        };
      } else {
        return review.toObject();
      }
    });

    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      reviews: reviewWithPhoto,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting reviews",
      error: error,
    });
  }
};
