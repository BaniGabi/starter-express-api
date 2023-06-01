// cartModel.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
