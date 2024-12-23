const express = require("express");
const router = require("express").Router();
const { User, Rating } = require("../models");
const { filter } = require("lodash");
// const axios = require("axios");
//let apiLink = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-21&sortBy=publishedAt&apiKey=7e298be2b074469685f446919ba4226b`;

router.get("/", (req, res) => {
  const loggedin = req.session.logged_in;
  const apiurl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=7e298be2b074469685f446919ba4226b`;
  fetch(apiurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res.render("home", {
        articles: data.articles,
        title: "NewsHub",
        loggedin: loggedin,
      });
    });
});

router.get("/search/:searchData", (req, res) => {
  const loggedin = req.session.logged_in;
  const apiKey = "7e298be2b074469685f446919ba4226b";
  const apiLink = `https://newsapi.org/v2/everything?q=${req.params.searchData}&sortBy=popularity&apiKey=${apiKey}`;
  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res.render("home", {
        articles: data.articles,
        title: "NewsHub",
        cssfile: "stars.css",
        loggedin: loggedin,
      });
    });
});

router.get("/api/news", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const response = await getActiveResourcesInfo.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          country: "us",
          apiKey: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

router.get("/login", (req, res) => {
  res.render("newshubLogin", { title: "Login", cssfile: "newshubLogin.css" });
});

router.get("/signup", (req, res) => {
  res.render("newshubSignup", {
    title: "Signup",
    cssfile: "newshubSignup.css",
  });
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.post("/api/rating/save", async (req, res) => {
  if (!req.body)
    try {
      console.log(req.body);
      const newRating = await Rating.create({
        articletitle: req.body.articletitle,
        articleimg: req.body.articleimg,
        articleurl: req.body.articleurl,

        articledescription: req.body.articledescription,
        starrating: req.body.starrating,
        user_id: req.session.user_id,
      });
      res.status(200).json(newRating);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error saving rating" });
    }
});

router.get("/profile", async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  }
  const loggedin = req.session.logged_in;
  const userName = req.session.username;
  const dataRating = await Rating.findAll({
    where: { user_id: req.session.user_id },
  });
  console.log(dataRating);
  const cleanData = dataRating.map((d) => d.get({ plain: true }));
  res.render("profile", {
    dataRating: cleanData,
    loggedin: loggedin,
    userName: userName,
  });
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userData) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.json({
        user: newUser,
        message: "You are now logged in",
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("login", req.body);
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "The user does not exist." });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "The password is incorrect." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({
        user: userData,
        message: "You are now logged in",
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
