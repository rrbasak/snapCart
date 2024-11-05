import searchHistoryModel from "../models/searchHistoryModel.js";

// insert past search
// export const insertPastSearchControlller = async (req, res) => {
//   //console.log("req12121", req.body);
//   try {
//     const { search, userId } = req.body;
//     const existingPastSearch = await searchHistoryModel.findOne({
//       $and: [
//         { search: { $exists: true, $ne: null, $eq: search } },
//         { user: { $exists: true, $ne: null, $eq: userId } },
//       ],
//     });
//     // const existingPastSearch = await searchHistoryModel.findOne({
//     //   search: { $exists: true, $ne: null, $eq: search },
//     //   user: { $exists: true, $ne: null, $eq: userId },
//     // });
//     //console.log("existingPastSearch12122", existingPastSearch);
//     if (existingPastSearch) {
//       return res.status(200).send({
//         success: true,
//         message: "Already present in past search",
//       });
//     }
//     const pastsearch = await searchHistoryModel({
//       search,
//       user: userId,
//     }).save();
//     res.status(200).send({
//       success: true,
//       messsage: "Past search insert successfully!",
//       pastsearch,
//     });
//   } catch (error) {
//     //console.log("error",error);
//     res.status(500).send({
//       success: false,
//       message: "Error while inserting past search",
//       error: error,
//     });
//   }
// };

export const insertPastSearchControlller = async (req, res) => {
  //console.log("req12121", req.body);
  try {
    const { search, userId } = req.body;

    // Find if the search already exists for the user
    const existingPastSearch = await searchHistoryModel.findOne({
      search,
      user: userId,
    });
    //console.log("existingPastSearch", existingPastSearch);
    if (existingPastSearch) {
      return res.status(200).send({
        success: true,
        message: "Already present in past search",
      });
    }

    // If not existing, create a new past search entry
    const pastsearch = await searchHistoryModel.create({
      search,
      user: userId,
    });

    res.status(200).send({
      success: true,
      message: "Past search inserted successfully!",
      pastsearch,
    });
  } catch (error) {
    //console.log("error", error);

    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "Search already exists for this user.",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error while inserting past search",
      error: error.message,
    });
  }
};

//remove past search
export const removePastSearchControlller = async (req, res) => {
  try {
    const { search, userId } = req.params;

    const deleteResult = await searchHistoryModel.deleteOne({
      search: search,
      user: userId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Past search not found",
      });
    }

    const remainingSearches = await searchHistoryModel
      .find({
        user: userId,
      })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Past search removed successfully!",
      remainingSearches: remainingSearches,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while removing past search",
      error: error.message,
    });
  }
};

//get past search
export const getPastSearchControlller = async (req, res) => {
  try {
    const { userId } = req.params;

    const pastSearchResults = await searchHistoryModel
      .find({
        user: userId,
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).send({
      success: true,
      message: "Past searched data got successfully!",
      pastSearchResults: pastSearchResults,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting past search",
      error: error.message,
    });
  }
};
