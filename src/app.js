const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const coverSheetRoutes = require("./router/addcoversheet");
app.use("/", coverSheetRoutes);
const techpackCatalogueRoutes = require("./router/techpackcatalogue");
app.use("/", techpackCatalogueRoutes);
const bomDataRoutes = require("./router/bomdata");
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
