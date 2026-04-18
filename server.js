require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const engineRoutes = require("./routes/engineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Main Adaptive Engine Routes
app.use("/api/engine", engineRoutes);

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "EverMove Backend Active" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 EverMove Engine API running on port ${PORT}`);
});
