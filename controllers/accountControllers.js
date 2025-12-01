module.exports.renderPage = async function(app,req,res) {
    const { jwtDecode } = require('jwt-decode');
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