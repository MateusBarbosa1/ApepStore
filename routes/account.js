module.exports = function(app) {
    const accountControllers = require('../controllers/accountControllers');
    app.get('/account', (req,res) => {
        accountControllers.renderPage(app,req,res);
    });
}