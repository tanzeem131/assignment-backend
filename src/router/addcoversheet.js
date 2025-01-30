const express = require("express");
const router = express.Router();
const CoverSheet = require("../models/coverSheet");

router.post("/add-coversheet", async (req, res) => {
  try {
    const {
      brand,
      designer,
      description,
      styleName,
      styleCode,
      season,
      sizeRange,
      dateCreated,
      images,
    } = req.body;

    const newCoverSheet = new CoverSheet({
      brand,
      designer,
      description,
      styleName,
      styleCode,
      season,
      sizeRange,
      dateCreated,
      images,
    });

    await newCoverSheet.save();
    res.status(201).json({
      message: "Cover sheet added successfully",
      coverSheet: newCoverSheet,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
