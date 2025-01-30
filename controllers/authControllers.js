module.exports.renderLoginPage = function (app, req, res) {
  res.render("auth/login");
};
module.exports.renderRegisterPage = function (app, req, res) {
  res.render("auth/register");
};
