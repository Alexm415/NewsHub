const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const User = require("../models/users.js");
// const axios = require("axios");
let apiLink = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-11&sortBy=publishedAt&apiKey=7e298be2b074469685f446919ba4226b`


router.get("/", (req, res) => {
  const loggedin = req.session.logged_in;

  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

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
      console.log(data);

      res.render("home", {
        articles: data.articles,
        title: "NewsHub",
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

router.post("/signup", async (req, res) => {
  console.log("sigup", req.body);
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
      userName: req.body.userName,
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
        userName: req.body.userName,
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

router.get("/login", (req, res) => {
  res.render("newshubLogin");
});

router.get("/signup", (req, res) => {
  res.render("newshubSignup");
});
 
router.post("/signup", async (req, res) => {
  console.log("sigup", req.body);
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userData) {
      res.status(400).json({ message: "User already exists" });
      return;
    };

    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.json({ user: newUser, message: "You are now logged in", success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

});

router.post("/login", async (req, res) => {
  console.log("login", req.body);
  try {
    const userData= await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "The user does not exist." });
      return;
    };
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "The password is incorrect." });
      return;
    };
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in", success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
);

module.exports = router;
