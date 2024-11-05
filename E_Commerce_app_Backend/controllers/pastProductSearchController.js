import searchProductModel from "../models/searchProductModel.js";

// insert past product search
export const insertPastProductSearchControlller = async (req, res) => {
  //console.log("Insert past product search",req.params)
  try {
    const { productId, userId } = req.params;
    const existingPastProductearch = await searchProductModel.findOne({
      $and: [
        { product: { $exists: true, $ne: null, $eq: productId } },
        { user: { $exists: true, $ne: null, $eq: userId } },
      ],
      // product: productId,
      // user: userId,
    });
    // //console.log("existingPastSearch12122", existingPastProductearch);
    if (existingPastProductearch) {
      // Update the `updatedAt` timestamp to move it to the end of the list
      existingPastProductearch.updatedAt = new Date();
      await existingPastProductearch.save();
      return res.status(200).send({
        success: true,
        message: "Already present in past product search",
        pastproductsearch: existingPastProductearch,
      });
    }
    const pastproductsearch = await searchProductModel({
      product: productId,
      user: userId,
    }).save();
    res.status(200).send({
      success: true,
      messsage: "Past product search insert successfully!",
      pastproductsearch,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while inserting past product search",
      error: error,
    });
  }
};
// //remove past search
// export const removePastSearchControlller = async (req, res) => {
//   try {
//     const { search, userId } = req.params;

//     const deleteResult = await searchHistoryModel.deleteOne({
//       search: search,
//       user: userId,
//     });

//     if (deleteResult.deletedCount === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "Past search not found",
//       });
//     }

//     const remainingSearches = await searchHistoryModel
//       .find({
//         user: userId,
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).send({
//       success: true,
//       message: "Past search removed successfully!",
//       remainingSearches: remainingSearches,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while removing past search",
//       error: error.message,
//     });
//   }
// };

//get past product  search
export const getPastProductSearchControlller = async (req, res) => {
  try {
    const { userId } = req.params;

    const pastproductSearchResults = await searchProductModel
      .find({
        user: userId,
      })
      .populate("product", "-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Past product searched data got successfully!",
      pastproductSearchResults: pastproductSearchResults,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting past product search",
      error: error.message,
    });
  }
};
