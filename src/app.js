const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;

app.use(cors());

app.use(express.json());

const techpackCatalogueRoutes = require("./router/techpackcatalogue");
const bomDataRoutes = require("./router/bomdata");
app.use("/", techpackCatalogueRoutes);
app.use("/", bomDataRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection not established");
  });
