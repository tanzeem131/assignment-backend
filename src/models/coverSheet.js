const mongoose = require("mongoose");

const coverSheetSchema = new mongoose.Schema({
  brand: { type: String, minlength: 2, maxlength: 30, required: true },
  designer: { type: String, minlength: 2, maxlength: 30, required: true },
  description: { type: String, minlength: 2, maxlength: 30, required: true },
  styleName: { type: String, minlength: 2, maxlength: 30, required: true },
  styleCode: { type: String, minlength: 2, maxlength: 30, required: true },
  season: { type: String, minlength: 2, maxlength: 30, required: true },
  sizeRange: { type: String, minlength: 2, maxlength: 30, required: true },
  dateCreated: { type: Date, minlength: 2, maxlength: 30, required: true },
  images: [{ type: String }],
});

module.exports = mongoose.model("CoverSheet", coverSheetSchema);
