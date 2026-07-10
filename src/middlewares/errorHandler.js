const errorHandler = async function (err, req, res, next) {
  console.log(err);
  res.render("Server_Error/internel_server_error", { err });
};

module.exports = errorHandler;

//Implement flash message in the error handler
