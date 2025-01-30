const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/database");
const app = express();
const cors = require("cors");
require("dotenv").config();
let { PORT } = process.env;

const bomItem = require("./models/bom");
const techpackCatalogue = require("./models/techpackCatalogue");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.post("/add-techpackCatalogue", async (req, res) => {
  try {
    const { image, name } = req.body;
    const newtechpackCatalogue = new techpackCatalogue({
      image,
      name,
    });
    await newtechpackCatalogue.save();
    res
      .status(201)
      .json({ message: "Item added successfully", item: newtechpackCatalogue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/get-techpackCatalogue", async (req, res) => {
  try {
    const items = await techpackCatalogue.find();
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.error("Error in /get-bom:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Utility function to convert string to mongoose data type
const getMongooseType = (type) => {
  const types = {
    string: String,
    number: Number,
    boolean: Boolean,
    date: Date,
    array: Array,
    object: Object,
  };
  return types[type.toLowerCase()] || String; // Default to String if type is unknown
};

// API to dynamically add a new column
app.post("/add-column", async (req, res) => {
  try {
    const { columnName, dataType } = req.body;

    if (!columnName || !dataType) {
      return res
        .status(400)
        .json({ message: "Column name and data type are required." });
    }

    // Validate column name
    if (typeof columnName !== "string" || columnName.trim() === "") {
      return res.status(400).json({ message: "Invalid column name." });
    }

    // Convert string to Mongoose data type
    const mongooseType = getMongooseType(dataType);

    // Add new field dynamically
    const updatedSchema = new mongoose.Schema({
      ...bomItem.schema.obj,
      [`dynamicFields.${columnName}`]: { type: mongooseType },
    });

    // Update the model
    mongoose.models.BOMItem = mongoose.model("BOMItem", updatedSchema);

    res
      .status(200)
      .json({ message: `Column '${columnName}' added successfully.` });
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/add-bom", async (req, res) => {
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

app.get("/get-bom", async (req, res) => {
  try {
    const items = await bomItem.find();
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.error("Error in /get-bom:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection not established");
  });
