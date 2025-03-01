import exchangeModel from "../models/exchangeModel.js";

// create exchange cart of a user
export const createExchangeControlller = async (req, res) => {
  ////console.log("req", req.body);
  try {
    const { brand, model, damage, user, product } = req.body;
    const existingExchange = await exchangeModel.findOne({ user, product });
    if (existingExchange) {
      const exchangeproduct = await exchangeModel.findOneAndUpdate(
        { user, product },
        req.body,
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Exchange updated successfully",
        exchangeproduct,
      });
    }
    const exchangeproduct = await exchangeModel({
      ...req.body,
    }).save();

    ////console.log(exchangeproduct);
    res.status(200).send({
      success: true,
      messsage: "Exchange created successfully",
      exchangeproduct,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating exchange product",
      error: error,
    });
  }
};
//get exchange product
export const getExchangeControlller = async (req, res) => {
  try {
    const { authId, exchangeId } = req.params;
    ////console.log("here", authId, exchangeId);
    const existingExchangeProduct = await exchangeModel.findOne({
      user: authId,
      _id: exchangeId,
    });
    ////console.log("existingExchangeProduct", existingExchangeProduct);
    res.status(200).send({
      success: true,
      messsage: "Exchange product getting successfully",
      existingExchangeProduct,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getiing exchange product",
      error: error,
    });
  }
};

//delete exchange cart of a user
// export const deleteExchangeControlller = async (req, res) => {
//   try {
//     const { authId, exchangeId } = req.params;
//     ////console.log("HIII", authId, exchangeId);

//     // Find the user's cart and delete the specific item
//     const deleteResult = await exchangeModel.deleteOne({
//       _id: exchangeId,
//       user: authId,
//     });

//     if (deleteResult.deletedCount === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "Exchange product not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Exchange item removed successfully!",
//       deleteResult: deleteResult,
//     });
//   } catch (error) {
//     ////console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting exchange product",
//       error: error.message,
//     });
//   }
// };

// Delete exchange cart of a user
export const deleteExchangeController = async (req, res) => {
  try {
    const { authId, exchangeId } = req.params;
    ////console.log("HIII", authId, exchangeId);

    // Define the query object
    const query = { _id: exchangeId };

    // If authId is present, include it in the query
    if (authId) {
      query.user = authId;
    }

    // Find and delete the exchange item based on the query
    const deleteResult = await exchangeModel.deleteOne(query);

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Exchange product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Exchange item removed successfully!",
      deleteResult: deleteResult,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting exchange product",
      error: error.message,
    });
  }
};
