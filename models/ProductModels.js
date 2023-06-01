//imports
const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  drugName: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Drug", drugSchema);
