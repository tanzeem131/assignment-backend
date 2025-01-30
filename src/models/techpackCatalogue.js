const mongoose = require("mongoose");

const techpackCatalogueSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      minlength: 2,
      maxlength: 500,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TechpackCatalogue", techpackCatalogueSchema);
