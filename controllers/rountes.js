const express = require("express");
const router = express.Router();
// const axios = require("axios");
let apiLink = `https://newsapi.org/v2/everything?q=tesla&from=2024-10-15&sortBy=publishedAt&apiKey=7e298be2b074469685f446919ba4226b`


router.get("/", (req, res) => {

  
  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data);
    
    res.render("home", {articles:data.articles});

    });
});

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