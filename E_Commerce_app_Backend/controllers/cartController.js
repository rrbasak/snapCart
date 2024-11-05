import slugify from "slugify";
import fs from "fs";
import cartModel from "../models/cartModel.js";

// create cart
export const createCartControlller = async (req, res) => {
  //console.log("req", req.body);
  try {
    const {
      user,
      name,
      product,
      orgprice,
      quantity,
      totalquantity,
      isprime,
      isexchangeapplied,
    } = req.body;
    const existingCart = await cartModel.findOne({
      user,
      name,
      isexchangeapplied,
    });
    //console.log("existingCart", existingCart);
    if (existingCart) {
      const existingCartUpdate = await cartModel.findOneAndUpdate(
        { user, name, isexchangeapplied },
        req.body,
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Cart updated successfully",
        cart: existingCartUpdate,
      });
    }
    const cart = await cartModel({
      ...req.body,
    }).save();

    //console.log("cart yes", cart);
    res.status(200).send({
      success: true,
      message: "Cart created successfully",
      cart,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating cart",
      error: error,
    });
  }
};
// update cart
// export const updateCartControlller = async (req, res) => {
//   //console.log("req", req.body);
//   try {
//     const { name, product, orgprice, quantity } = req.body;
//     const existingCartCategory = await cartModel.findOne({ name });
//     if (existingCartCategory) {
//       return res.status(200).send({
//         success: true,
//         message: "This cart already exisits",
//       });
//     }
//     const cart = await cartModel({
//       ...req.body,
//       // slug: slugify(name),
//     }).save();

//     //console.log(cart);
//     res.status(200).send({
//       success: true,
//       messsage: "Cart created successfully",
//       cart,
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

//get cart of a user
export const getCartControlller = async (req, res) => {
  try {
    const { auth_id } = req.params;
    //console.log(auth_id);
    const cartOnUser = await cartModel
      .find({ user: auth_id })
      .populate("product")
      .populate("exchangeProduct");
    //console.log("cartOnUser", cartOnUser);
    res.status(200).send({
      success: true,
      messsage: "Cart getting successfully",
      cartOnUser,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting cart",
      error: error,
    });
  }
};
//delete cart of a user
export const removeCartController = async (req, res) => {
  try {
    const { auth_id, pid } = req.params;
    //console.log("HIII", auth_id, pid);

    // Find the user's cart and delete the specific item
    const deleteResult = await cartModel.deleteOne({ user: auth_id, _id: pid });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Cart item not found",
      });
    }

    // Retrieve the updated cart for the user
    const updatedCart = await cartModel.find({ user: auth_id });

    res.status(200).send({
      success: true,
      message: "Cart item deleted successfully",
      cartOnUser: updatedCart,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting cart",
      error: error.message,
    });
  }
};
