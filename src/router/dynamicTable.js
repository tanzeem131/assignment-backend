const express = require("express");
const router = express.Router();
const DynamicTable = require("../models/dynamicTable");

router.post("/add-row", async (req, res) => {
  try {
    const {
      image,
      item,
      description,
      quantity,
      quality,
      colorCode,
      supplier,
      dynamicFields,
    } = req.body;

    const newRow = new DynamicTable({
      image,
      item,
      description,
      quantity,
      quality,
      colorCode,
      supplier,
      dynamicFields,
    });

    await newRow.save();
    res.status(201).json({ message: "Row added successfully", data: newRow });
  } catch (error) {
    res.status(500).json({ message: "Error adding row", error: error.message });
  }
});

router.patch("/add-columns", async (req, res) => {
  try {
    const { columnName, defaultValue } = req.body;

    if (!columnName) {
      return res.status(400).json({ message: "Column name is required" });
    }

    // Update all documents to include this new column with a default value
    await DynamicTable.updateMany(
      {},
      { $set: { [`dynamicFields.${columnName}`]: defaultValue || null } }
    );

    res
      .status(200)
      .json({ message: `Column '${columnName}' added successfully.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding column", error: error.message });
  }
});

router.patch("/update-cell/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { columnName, value } = req.body;

    if (!columnName) {
      return res.status(400).json({ message: "Column name is required" });
    }
    const updatedRow = await DynamicTable.findByIdAndUpdate(
      id,
      { $set: { [`dynamicFields.${columnName}`]: value } },
      { new: true }
    );

    if (!updatedRow) {
      return res.status(404).json({ message: "Row not found" });
    }

    res
      .status(200)
      .json({ message: "Cell updated successfully", data: updatedRow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cell", error: error.message });
  }
});

router.get("/get-table", async (req, res) => {
  try {
    const tableData = await DynamicTable.find();
    res.status(200).json({ message: "Table data retrieved", data: tableData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});

module.exports = router;
