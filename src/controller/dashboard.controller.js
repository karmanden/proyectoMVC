const { render } = require("ejs");

exports.getDashboard = (req, res) => {
  res.render("dashboard");
  res.end();
};

exports.getUpdateDateClient = (req, res) => {
  res.render("updateClient");
  res.end();
};
exports.getReservar = (req, res) => {
  res.render("reservar")
  res.end()
}

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
