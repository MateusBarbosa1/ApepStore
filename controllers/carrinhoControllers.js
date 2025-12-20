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

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('carrinho/index', { nome: firstName, produtos: true });
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
