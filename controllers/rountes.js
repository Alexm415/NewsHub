const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/api/news", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const response = await getActiveResourcesInfo.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        apiKey: apiKey,
      },
    });
    res.json(response.data);
  } catch(error) {
    console.error("Error fetching news:", error);
    res.status(500).json({message: "Error fetching news"});
  }
});

module.exports = router;