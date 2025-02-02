const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://papaya-fudge-dc5dcd.netlify.app",
    ],
    withcredentials: true,
  })
);

app.use(express.json());

const techpackCatalogueRoutes = require("./router/techpackcatalogue");
const dynamicTableRoutes = require("./router/dynamicTable");
app.use("/", techpackCatalogueRoutes);
app.use("/", dynamicTableRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection not established");
  });
