module.exports = function(app) {
    const accountControllers = require('../controllers/accountControllers');
    app.get('/account', (req,res) => {
        accountControllers.renderPage(app,req,res);
    });
    app.get('/account/logout', (req,res) => {
        accountControllers.logout(app,req,res);
    });
}