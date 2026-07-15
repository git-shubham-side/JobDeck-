const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const User = require("./models/User");
const session = require("express-session");
const flash = require("connect-flash");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Controllers -> Signup/Register
const {
  registerPostController,
  registerGetController,
} = require("./controllers/registerController");

//Controllers -> Login
const {
  loginGetController,
  loginPostController,
} = require("./controllers/loginController");

//SESSION Setup
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

// Flash Setup
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// FROM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Error Handler -- Middleware
const errorhandler = require("./middlewares/errorHandler");

// Request Handling
app.get(["/api/v1/landing", "/"], (req, res) => {
  res.render("Landing/landing");
});

//Login Route
app.get("/api/v1/login", loginGetController);
app.post("/api/v1/login", loginPostController);

//Dasbhoard
//GET : /api/v1/dashboard
app.get("/api/v1/dashboard", async (req, res) => {
  let idx = req.session.userId;
  const user = await User.findById({ _id: idx });
  res.render("Dashboard/dashboard", { user });
});

//Signup Routes:
// GET : /api/v1/signup
app.get("/api/v1/signup", registerGetController);
// POST : /api/v1/signup
app.post("/api/v1/signup", registerPostController);

//Logout Routes
app.post("/api/v1/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid"); // Session cookie remove
    res.redirect("/api/v1/login");
  });
});

app.use(errorhandler);

module.exports = app;
