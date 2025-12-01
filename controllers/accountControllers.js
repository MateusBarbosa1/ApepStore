const { jwtDecode } = require('jwt-decode');

module.exports.renderPage = async function(app,req,res) {
    const token = req.cookies['token'];

    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);
        const firstName = usuario[0].nome.split(' ')[0];

        res.render('account/index', {nome: firstName});
    } else {
        res.render('account/index', {nome: false});
    }
}
module.exports.logout = function(app,req,res) {
    res.clearCookie('token').redirect('/');
}
module.exports.deleteAccount = async function(app,req,res) {
    const token = req.cookies['token'];
    const usersModel = require('../models/usuariosModel');

    if(token){        
        const tokenDecoded = jwtDecode(token);
        const statusDeleteUser = await usersModel.deleteUsuarioID(tokenDecoded.id);
        res.clearCookie('token');

        if(statusDeleteUser) {
            res.redirect('/register');
        }
    } else {
        res.redirect('/login');
    }
}