module.exports = function(app) {
    const carrinhoControllers = require('../controllers/carrinhoControllers');
    app.get('/carrinho', (req,res) => {
        carrinhoControllers.renderPage(app,req,res);
    });
    app.post('/add-carrinho', (req,res) => {
        carrinhoControllers.addCarrinho(app,req,res);
    });
    app.post('/carrinho/update-qtd', (req,res) => {
        carrinhoControllers.updateQtdCarrinho(app,req,res);
    });
    app.post('/carrinho/remove', (req,res) => {
        carrinhoControllers.removeCarrinho(app,req,res);
    });
}