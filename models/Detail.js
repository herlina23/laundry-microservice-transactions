const mongoose = require("mongoose");

// Detail Schema
const detailSchema = mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  process: {
    // type: String,
    // enum: ["Baru",her"Sedang Dicuci", "Sedang Disetrika", "Selesai", "Diambil"],
    // default: "Baru"

    type: mongoose.Schema.Types.ObjectId,
    ref: "Process",
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  // lastupdate: {
  //   type: Date,
  //   default: Date.now
  // }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Detail = (module.exports = mongoose.model("Detail", detailSchema));
