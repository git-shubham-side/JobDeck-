const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const User = require("./models/User");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo").default;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Login Routes
const loginRoutes = require("./routes/Login");
//Signup Routes
const signupRoutes = require("./routes/Signup");
//Dashboard Routes
const dashboardRoutes = require("./routes/Dashboard");
//Logout Routes
const logoutRoutes = require("./routes/Logout");

//SESSION Setup
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "JobDeck_sessions",
      ttl: 24 * 60 * 60,
      autoRemove: "native",
    }),
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

//Login --> /api/v1/login
app.use(loginRoutes);

//Signup --> /api/v1/signup
app.use(signupRoutes);

//Dasbhoard
//GET : /api/v1/dashboard
app.use(dashboardRoutes);

//Logout Routes
//POST : /api/v1/logout
app.use(loginRoutes);

//Server error Handler
app.use(errorhandler);

module.exports = app;
