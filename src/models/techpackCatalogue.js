const mongoose = require("mongoose");
const validator = require("validator");

const techpackCatalogueSchema = new mongoose.Schema(
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
