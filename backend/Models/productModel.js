const mongoose = require("mongoose");
const User = require("./userModel");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true, 
  },
  category: {
    type: String,
    required: true, 
  },

  isSold: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true, 
  },
});

module.exports = mongoose.model("Product", productSchema);