const Admin = require("../models/Recuriter");
const errorHandler = require("../middlewares/errorHandler");

const adminSignupController = async function (req, res, next) {
  const {
    fullName,
    designation,
    companyName,
    companyWebsite,
    companySize,
    workEmail,
    password,
    terms,
  } = req.body;

  try {
    const admin = await Admin.create({
      fullName,
      designation,
      companyName,
      companyWebsite,
      companySize,
      workEmail,
      password,
      terms: terms === "on",
    });
    req.flash(
      "success",
      `Congratulations ${admin.fullName}, account created successfully!`,
    );

    //Code : 77788990
    res.redirect("/api/v1/admin/dashboard");
  } catch (err) {
    next(err);
  }
};

module.exports = adminSignupController;
