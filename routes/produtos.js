module.exports = function (app) {
  const produtosControllers = require("../controllers/produtosControllers.js");
  app.get("/produto-single/:id", (req, res) => {
    produtosControllers.renderPageProdutoSingle(app, req, res);
  });
  app.get("/produto-single-cart/:id", (req, res) => {
    produtosControllers.renderPageProdutoSingle(app, req, res);
  });
  app.get("/camisetas", (req, res) => {
    produtosControllers.renderPageCamisetas(app, req, res);
  });
  app.get("/sapatos", (req, res) => {
    produtosControllers.renderPageSapatos(app, req, res);
  });
  app.get("/roupas-femininas", (req, res) => {
    produtosControllers.renderPageFemininas(app, req, res);
  });
};
