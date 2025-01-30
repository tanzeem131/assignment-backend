const express = require("express");
const router = express.Router();
const techpackCatalogue = require("../models/techpackCatalogue");

router.post("/add-techpackCatalogue", async (req, res) => {
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

router.get("/get-techpackCatalogue", async (req, res) => {
  try {
    const items = await techpackCatalogue.find();
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.error("Error in /get-bom:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
