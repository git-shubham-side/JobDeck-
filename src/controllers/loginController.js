const User = require("../models/User");
//LOGIN Controllers

// Path :Get -> /api/v1/login
const loginGetController = async function (req, res) {
  res.render("Login/login");
};

// Path :POST -> /api/v1/login
const loginPostController = async function (req, res) {
  const { email, password } = req.body;

  //Retriving User and Password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    req.flash("error", "User Not Found! Please Signup");
    return res.redirect("/api/v1/login");
  }

  //Compare - Checking password
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    req.flash("error", "Incorrect password. Please try again.");
    return res.redirect("/api/v1/login");
  }

  //ID Storing into Session
  req.session.userId = user._id;
  req.flash("success", `Welcome back, ${user.firstName}`);
  res.redirect("/api/v1/dashboard");
};

module.exports = { loginPostController, loginGetController };
