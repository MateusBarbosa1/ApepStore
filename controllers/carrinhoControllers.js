/**
 * Renderiza a página do carrinho
 */
module.exports.renderPage = async function (app, req, res) {
    // Decodificador de JWT
    const { jwtDecode } = require('jwt-decode');

    // Token do usuário (caso esteja logado)
    const token = req.cookies['token'];

    // Se existir token, tenta identificar o usuário
    if (token) {
        const usuariosModel = require('../models/usuariosModel');
        const produtosModel = require('../models/produtosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];

            // Pegar os produtos do carrinho
            const infoCarrinho = await usuariosModel.getCarrinho(tokenDecoded.id);
            const carrinho = Array.isArray(infoCarrinho) ? infoCarrinho : [];

            if (carrinho.length === 0) {
                return res.render('carrinho/index', {
                    nome: firstName,
                    produtos: []
                });
            }

            const produtosCarrinho = [];

            for (let i = 0; i < carrinho.length; i++) {
                const produtoIdCarrinho = await produtosModel.getProdutoID(carrinho[i].id);

                produtosCarrinho.push({
                    id: carrinho[i].id,
                    img: produtoIdCarrinho[0].img,
                    nome: produtoIdCarrinho[0].nome_produto,
                    preco: produtoIdCarrinho[0].preco,
                    cor: carrinho[i].cor,
                    tamanho: carrinho[i].size,
                    qtd: carrinho[i].qtd
                });
            }

            return res.render('carrinho/index', {
                nome: firstName,
                produtos: produtosCarrinho
            });
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não logado
    res.render('carrinho/index', { nome: false, produtos: false });
};

/**
 * Adiciona um produto ao carrinho do usuário
 */
module.exports.addCarrinho = async function (app, req, res) {
    // Decodificador de JWT
    const { jwtDecode } = require('jwt-decode');

    // Token do usuário
    const token = req.cookies['token'];

    // Apenas usuários autenticados podem adicionar produtos
    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const produtoCart = req.body;

            // Tenta adicionar o produto ao carrinho
            const produtoCarrinho = await usuariosModel.addCarrinho(
                usuario[0].id,
                produtoCart
            );

            // Produto já existente no carrinho
            if (produtoCarrinho === 'produto_ja_adicionado') {
                return res.status(401).json({ error: true });
            }

            // Produto adicionado com sucesso
            return res.status(200).json({ success: true });
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não autenticado
    res.redirect('/carrinho');
};

/**
 * Atualiza a quantidade de um produto que está no carrinho
 */
module.exports.updateQtdCarrinho = async function(app,req,res) {
    // Decodificador de JWT
    const { jwtDecode } = require('jwt-decode');

    // Token do usuário
    const token = req.cookies['token'];

    // Apenas usuários autenticados podem adicionar produtos
    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);


        // Usuário válido
        if (usuario.length !== 0) {
            const infoProduto = req.body;

            await usuariosModel.updateCarrinho(tokenDecoded.id,infoProduto.id,infoProduto.qtd, 'qtd');
            return;
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não autenticado
    res.redirect('/carrinho');
}

/**
 * Remove o produto que ta no carrinho
 */
module.exports.removeCarrinho = async function(app,req,res) {
    // Decodificador de JWT
    const { jwtDecode } = require('jwt-decode');

    // Token do usuário
    const token = req.cookies['token'];

    // Apenas usuários autenticados podem remover produtos
    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);


        // Usuário válido
        if (usuario.length !== 0) {
            const id = req.body.id;

            await usuariosModel.removeProdutoCarrinho(tokenDecoded.id,id);
            return;
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não autenticado
    res.redirect('/carrinho');
}