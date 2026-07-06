async function notFoundHandler(req, res, next) {
  console.log("Middleware Activated");
}

//Not Found Middleware
module.exports = notFoundHandler;
