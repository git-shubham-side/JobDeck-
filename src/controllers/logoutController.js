//Path : --> /api/v1/logout
const logoutContoller = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid"); // Session cookie remove
    res.redirect("/api/v1/login");
  });
};

module.exports = logoutContoller;
