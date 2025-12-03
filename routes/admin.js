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
}