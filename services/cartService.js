const CartModel = require("../models/CartModel");

// Function to add a product to the cart
const addProductToCart = async (cartItem) => {
  const { product, quantity, user } = cartItem;

  const existingCartItem = await CartModel.findOne({
    user: user,
    product: product._id,
  });

  if (existingCartItem) {
    // Product already exists in the cart, update the quantity
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
  } else {
    // Product doesn't exist in the cart, create a new cart item
    await CartModel.create({ user: user, product: product, quantity });
  }
};

const getCart = async (user) => {
  try {
    const carts = await CartModel.find({ user: user }).populate(
      "product.product"
    );
    return carts;
  } catch (error) {
    console.error("Error retrieving cart:", error);
    throw error;
  }
};

const deleteCart = async (productId) => {
  try {
    await CartModel.findByIdAndRemove(productId).then(() => {
      console.log("delleted cart successfully...");
    });
  } catch (error) {
    console.log("Error while deleting : ", error);
  }
};

module.exports = {
  addProductToCart,
  getCart,
  deleteCart,
};
