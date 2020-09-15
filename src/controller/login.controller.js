exports.getLogin = (req, res) => {
  res.render("login");
  res.end();
};

exports.postLogin = (req, res) => {
  res.json(req.body)
};

