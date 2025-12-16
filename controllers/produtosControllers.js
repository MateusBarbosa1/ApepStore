const { jwtDecode } = require('jwt-decode');
const produtosModel = require('../models/produtosModel');

module.exports.renderPageProdutoSingle = async function(app,req,res) {
    const token = req.cookies['token'];

    const idProduto = req.params.id;

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
module.exports.renderPageCamisetas = async function (app, req, res) {
    const token = req.cookies['token'];

    const camisetas = await produtosModel.getProdutosCATEGORIA('camisetas');

    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            res.render('produtos/camisetas', {nome: firstName, camisetas: camisetas});
        } else {
            res.clearCookie('token');
            res.render('produtos/camisetas', {nome: false, camisetas: camisetas});
        }
    } else {
        res.render('produtos/camisetas', {nome: false, camisetas: camisetas});
    }
};
module.exports.renderPageSapatos = async function (app, req, res) {
    const token = req.cookies['token'];

    const sapatos = await produtosModel.getProdutosCATEGORIA('sapatos');


    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            res.render('produtos/sapatos', {nome: firstName, sapatos: sapatos});
        } else {
            res.clearCookie('token');
            res.render('produtos/sapatos', {nome: false, sapatos: sapatos});
        }
    } else {
        res.render('produtos/sapatos', {nome: false, sapatos: sapatos});
    }
}
module.exports.renderPageFemininas = async function (app, req, res) {
    const token = req.cookies['token'];

    const femininas = await produtosModel.getProdutosCATEGORIA('femininas');

    if(token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if(usuario.length != 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            res.render('produtos/femininas', {nome: firstName, femininas: femininas});
        } else {
            res.clearCookie('token');
            res.render('produtos/femininas', {nome: false, femininas: femininas});
        }
    } else {
        res.render('produtos/femininas', {nome: false, femininas: femininas});
    }
}
