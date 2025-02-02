const mongoose = require("mongoose");
const validator = require("validator");

const dynamicTableSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      maxlength: 500,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL:");
        }
      },
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
    dynamicFields: { type: Map, of: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const DynamicTable = mongoose.model("DynamicTable", dynamicTableSchema);

module.exports = DynamicTable;
