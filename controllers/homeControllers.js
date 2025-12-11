module.exports.renderHome = async function(app,req,res) {
    const { jwtDecode } = require('jwt-decode');
    const token = req.cookies['token'];

    const produtosModel = require('../models/produtosModel');
    const produtos = await produtosModel.getProdutos();

    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];

            res.render('home/index', {nome: firstName, produtos: produtos});
        } else {
            res.clearCookie('token');
            res.render('home/index', {nome: false, produtos: produtos});

        }
    } else {
        res.render('home/index', {nome: false, produtos: produtos});
    }
}