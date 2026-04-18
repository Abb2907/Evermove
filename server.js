require("dotenv").config();
const express = require("express");
const cors = require("cors");
const engineRoutes = require("./routes/engineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Main Adaptive Engine Routes
app.use("/api/engine", engineRoutes);

// Root endpoint welcome message
app.get("/", (req, res) => {
  res.send("<h1>EverMove API Running</h1><p>Visit /api/engine/status/user_101 or POST to /api/engine/evaluate.</p>");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "EverMove Backend Active" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 EverMove Engine API running on port ${PORT}`);
});
