module.exports.renderPage = async function (app, req, res) {
    const { jwtDecode } = require('jwt-decode');
    const token = req.cookies['token'];

    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            res.render('produtos/camisetas', {nome: firstName});
        } else {
            res.clearCookie('token');
            res.render('produtos/camisetas', {nome: false});
        }
    } else {
        res.render('produtos/camisetas', {nome: false});
    }
};
