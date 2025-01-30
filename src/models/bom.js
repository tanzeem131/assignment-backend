const mongoose = require("mongoose");

const bomSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      minlength: 2,
      maxlength: 500,
    },
    item: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      default: "default description",
      maxlength: 200,
    },
    quantity: {
      type: Number,
      min: 0,
      max: 999,
    },
    quality: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    colorCode: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    supplier: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    dynamicFields: { type: Object, default: {} },
  },
  {
    timestamps: true,
  },
  { strict: false }
);

module.exports = mongoose.model("Bom", bomSchema);
