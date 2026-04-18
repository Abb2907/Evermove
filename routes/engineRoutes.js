const express = require("express");
const router = express.Router();
const adaptiveEngine = require("../services/adaptiveEngine");
const database = require("../models/mockDatabase");

// Evaluate a user context and get the required nudges
router.post("/evaluate", async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
       return res.status(400).json({ error: "Missing userId" });
    }

    const payload = await adaptiveEngine.evaluateUserContext(userId);
    
    res.status(200).json({
      success: true,
      data: payload
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fetch basic mock profile
router.get("/status/:userId", (req, res) => {
  const user = database.getUser(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ success: true, user });
});

module.exports = router;
