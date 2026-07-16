const User = require("../models/User");
//Dashboard Controller

const dashboardController = async (req, res) => {
  let idx = req.session.userId;
  const user = await User.findById({ _id: idx });
  res.render("Dashboard/dashboard", { user });
};

module.exports = dashboardController;
