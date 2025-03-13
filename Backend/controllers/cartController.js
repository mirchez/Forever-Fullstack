import userModel from "../models/userModel.js";

//add products to user cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: true, message: error.message });
  }
};

//update user cart
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: true, message: error.message });
  }
};

//get user cart data
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: true, message: error.message });
  }
};
