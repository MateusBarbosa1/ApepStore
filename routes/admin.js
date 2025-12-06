module.exports = function(app) {
    const adminControllers = require('../controllers/adminControllers.js');
    app.get('/admin', (req,res) => {
        adminControllers.renderPageLogin(app,req,res);
    });
    app.post('/admin', (req,res) => {
        adminControllers.autenticarAdmin(app,req,res);
    });
    app.get('/admin/getAllUsersJSON', (req,res) => {
        adminControllers.getAllUsers(app,req,res,'json');
    });
    app.get('/admin/getAllUsers', (req,res) => {
        adminControllers.getAllUsers(app,req,res,'body');
    });
    app.post('/admin/getAllUsers/delete', (req,res) => {
        adminControllers.deletarUsuario(app,req,res);
    });
    app.get('/admin/createProduct', (req,res) => {
        adminControllers.renderCreateProduct(app,req,res);
    });
    app.post('/admin/createProduct', (req,res) => {
        adminControllers.createProduct(app,req,res);
    });
    app.get('/admin/getProdutos', (req,res) => {
        adminControllers.getProdutos(app,req,res,'body');
    });
    app.get('/admin/getProdutosJSON', (req,res) => {
        adminControllers.getProdutos(app,req,res,'json');
    });
    app.post('/admin/getProdutos/delete', (req,res) => {
        adminControllers.deleteProduto(app,req,res);
    });
    app.post('/admin/getProdutos/update', (req,res) => {
        adminControllers.updateProduto(app,req,res);
    });
}