const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bomItem = require("../models/bom");

router.post("/add-bom", async (req, res) => {
  try {
    // const {
    //   image,
    //   item,
    //   description,
    //   quantity,
    //   quality,
    //   colorCode,
    //   supplier,
    //   ...dynamicFields
    // } = req.body;
    // const newItem = new bomItem({
    //   image,
    //   item,
    //   description,
    //   quantity,
    //   quality,
    //   colorCode,
    //   supplier,
    //   ...dynamicFields,
    // });
    const newItem = new bomItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/get-bom", async (req, res) => {
  try {
    const items = await bomItem.find();
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.error("Error in /get-bom:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getMongooseType = (type) => {
  const types = {
    string: String,
    number: Number,
    boolean: Boolean,
    date: Date,
    array: Array,
    object: Object,
  };
  return types[type.toLowerCase()] || String;
};

router.post("/add-column", async (req, res) => {
  try {
    const { columnName, dataType } = req.body;

    if (!columnName || !dataType) {
      return res
        .status(400)
        .json({ message: "Column name and data type are required." });
    }

    if (typeof columnName !== "string" || columnName.trim() === "") {
      return res.status(400).json({ message: "Invalid column name." });
    }

    const mongooseType = getMongooseType(dataType);

    const updatedSchema = new mongoose.Schema({
      ...bomItem.schema.obj,
      [`dynamicFields.${columnName}`]: { type: mongooseType },
    });

    mongoose.models.BOMItem = mongoose.model("BOMItem", updatedSchema);

    res
      .status(200)
      .json({ message: `Column '${columnName}' added successfully.` });
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
