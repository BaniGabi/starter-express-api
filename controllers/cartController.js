// cartController.js
const CartModel = require("../models/CartModel");
const cartService = require("../services/cartService");
const mongoose = require("mongoose");

module.exports.addToCart = async (req, res) => {
  const { product, quantity, user } = req.body;
  //const userId = req.user.id;

  const cartItem = {
    user,
    product,
    quantity,
  };

  try {
    await cartService.addProductToCart(cartItem);
    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

module.exports.getProductsCart = async (req, res) => {
  const { user } = req.query;
  try {
    const carts = await cartService.getCart(user);
    return res.status(201).json(carts);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

module.exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  const objectId = mongoose.Types.ObjectId.createFromHexString(id);
  const deletedCart = await CartModel.findByIdAndDelete(objectId);
  if (deletedCart) {
    console.log("Cart deleted successfully:", deletedCart);
    res.send("Cart deleted successfully");
  } else {
    console.log("Cart not found");
    res.status(404).send("Cart not found");
  }
};
