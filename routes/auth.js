module.exports = function (app) {
  const authControllers = require("../controllers/authControllers");
  app.get("/login", (req, res) => {
    authControllers.renderLoginPage(app, req, res);
  });
  app.get("/register", (req, res) => {
    authControllers.renderRegisterPage(app, req, res);
  });
};
