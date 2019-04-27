const mongoose = require("mongoose");

// Transaction Schema
const transactionSchema = mongoose.Schema({
  invoice: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  member: {
    type: Number,
    ref: "Member",
    required: true
  },
  dateIn: {
    type: Date,
    // default: Date.now()
    default: new Date("2019-04-03T12:38:08")
  },
  dateOut: {
    type: Date,
    default: null
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ["lunas", "belum lunas"],
    default: "belum lunas"
  },
  recepient: {
    type: String,
    default: null
  }
});

const Transaction = (module.exports = mongoose.model(
  "Transaction",
  transactionSchema
));
