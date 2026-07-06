const bcrypt = require("bcrypt");
const User = require("../models/User");
const errorhandler = require("../middlewares/errorHandler");

// Controllers - Routes
// POST: /api/v1/signup

const registerPostController = async function (req, res, next) {
  const { firstName, lastName, email, terms, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Regestraion Using Signup From
    // Post : /api/v1/signup

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      terms: terms === "on",
      password: hashedPassword,
    });
    user.save();

    //Testing Error Handler Middleware
    // throw new Error("Something went wrong!");

    // Redirection Link : /api/v1/dashboard
    // When user successfully creates an account and redirect to Dashboard
    res.redirect("/api/v1/dashboard", { user: user });
  } catch (err) {
    // res.status(500).json({
    //   message: err.message,
    // });
    next(err);
  }
};

//GET : /api/v1/signup
const registerGetController = async function (req, res) {
  res.render("Signup/signup");
};

module.exports = { registerPostController, registerGetController };
