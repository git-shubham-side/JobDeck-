const User = require("../models/User");

// Controllers - Routes
// POST: /api/v1/signup
const registerPostController = async function (req, res, next) {
  const { firstName, lastName, email, terms, password } = req.body;
  try {
    //Saving the user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      terms: terms === "on",
      password,
    });

    //Storing User Id into Session
    req.session.userId = user._id;

    //Flash
    req.flash("success", `Welcome to JobDeck${user.firstName}`);
    // Redirection Link : /api/v1/dashboard
    // When user successfully creates an account and redirect to Dashboard
    return res.redirect("/api/v1/dashboard");
  } catch (err) {
    req.flash("error", "Email already exists");
    res.redirect("/api/v1/signup");
  }
};

//GET : /api/v1/signup
const registerGetController = async function (req, res) {
  res.render("Signup/signup");
};

module.exports = { registerPostController, registerGetController };
