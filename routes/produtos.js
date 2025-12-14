module.exports = function (app) {
  const produtosControllers = require("../controllers/produtosControllers.js");
  app.get("/produto-single/:id", (req, res) => {
    produtosControllers.renderPage(app, req, res);
  });
};
