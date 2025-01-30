module.exports = function (app) {
  const camisetasControllers = require("../controllers/camisetasControllers.js");
  app.get("/camisetas", (req, res) => {
    camisetasControllers.renderPage(app, req, res);
  });
};
