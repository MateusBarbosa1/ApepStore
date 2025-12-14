module.exports.renderPage = async function(app,req,res) {
    const { jwtDecode } = require('jwt-decode');
    const token = req.cookies['token'];

    const idProduto = req.params.id;

    const produtosModel = require('../models/produtosModel');
    const produto = await produtosModel.getProdutoID(idProduto);


    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            res.render('produtos/produto-single', {nome: firstName, produto: produto});
        } else {
            res.clearCookie('token');
            res.render('produtos/produto-single', {nome: false, produto: produto});
        }
    } else {
        res.render('produtos/produto-single', {nome: false, produto: produto});
    }
}