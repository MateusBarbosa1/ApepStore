/**
 * Renderiza a página inicial (Home)
 */
module.exports.renderHome = async function (app, req, res) {
    // Decodificador de JWT
    const { jwtDecode } = require('jwt-decode');

    // Token do usuário (caso esteja logado)
    const token = req.cookies['token'];

    // Busca todos os produtos
    const produtosModel = require('../models/produtosModel');
    const produtos = await produtosModel.getProdutos();

    // Se existir token, tenta identificar o usuário
    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('home/index', { nome: firstName, produtos });
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não logado
    res.render('home/index', { nome: false, produtos });
};
