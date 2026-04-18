require("dotenv").config();
const express = require("express");
const cors = require("cors");
const engineRoutes = require("./routes/engineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Main Adaptive Engine Routes
app.use("/api/engine", engineRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "EverMove Backend Active" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 EverMove Engine API running on port ${PORT}`);
});
