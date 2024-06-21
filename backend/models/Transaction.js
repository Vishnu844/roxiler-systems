const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: Date,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
