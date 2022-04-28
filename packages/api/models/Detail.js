const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
    },
    marque: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const detailModel = mongoose.model("detailModel", detailSchema, "detail");

module.exports = detailModel;
