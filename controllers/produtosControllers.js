// Biblioteca para decodificar JWT
const { jwtDecode } = require('jwt-decode');

// Model responsável pelos produtos
const produtosModel = require('../models/produtosModel');

/**
 * Renderiza a página de um produto específico
 */
module.exports.renderPageProdutoSingle = async function (app, req, res) {
    // Token do usuário (se estiver logado)
    const token = req.cookies['token'];

    // ID do produto vindo pela URL
    const idProduto = req.params.id;

    // Busca o produto no banco
    const produto = await produtosModel.getProdutoID(idProduto);

    // Se existir token, tenta identificar o usuário
    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('produtos/produto-single', { nome: firstName, produto });
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não logado
    res.render('produtos/produto-single', { nome: false, produto });
};

/**
 * Renderiza a página de camisetas
 */
module.exports.renderPageCamisetas = async function (app, req, res) {
    const token = req.cookies['token'];

    // Busca produtos da categoria camisetas
    const camisetas = await produtosModel.getProdutosCATEGORIA('camisetas');

    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('produtos/camisetas', { nome: firstName, camisetas });
        }

        res.clearCookie('token');
    }

    res.render('produtos/camisetas', { nome: false, camisetas });
};

/**
 * Renderiza a página de sapatos
 */
module.exports.renderPageSapatos = async function (app, req, res) {
    const token = req.cookies['token'];

    // Busca produtos da categoria sapatos
    const sapatos = await produtosModel.getProdutosCATEGORIA('sapatos');

    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('produtos/sapatos', { nome: firstName, sapatos });
        }

        res.clearCookie('token');
    }

    res.render('produtos/sapatos', { nome: false, sapatos });
};

/**
 * Renderiza a página de roupas femininas
 */
module.exports.renderPageFemininas = async function (app, req, res) {
    const token = req.cookies['token'];

    // Busca produtos da categoria femininas
    const femininas = await produtosModel.getProdutosCATEGORIA('femininas');

    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('produtos/femininas', { nome: firstName, femininas });
        }

        res.clearCookie('token');
    }

    res.render('produtos/femininas', { nome: false, femininas });
};
