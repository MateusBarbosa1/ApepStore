module.exports = function(app) {
    const carrinhoControllers = require('../controllers/carrinhoControllers');
    app.get('/carrinho', (req,res) => {
        carrinhoControllers.renderPage(app,req,res);
    });
    app.post('/add-carrinho', (req,res) => {
        carrinhoControllers.addCarrinho(app,req,res);
    });
}