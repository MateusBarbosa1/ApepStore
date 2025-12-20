const { jwtDecode } = require('jwt-decode');

/**
 * Renderiza a página da conta do usuário
 */
module.exports.renderPage = async function (app, req, res) {
    const token = req.cookies['token'];

    if (token) {
        const usuariosModel = require('../models/usuariosModel');

        const tokenDecoded = jwtDecode(token);
        const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

        // Usuário válido
        if (usuario.length !== 0) {
            const firstName = usuario[0].nome.split(' ')[0];
            return res.render('account/index', { nome: firstName, usuario: usuario[0] });
        }

        // Token inválido → remove cookie
        res.clearCookie('token');
    }

    // Usuário não logado
    res.render('account/index', { nome: false, usuario: false });
};

/**
 * Faz logout do usuário (remove cookie)
 */
module.exports.logout = function (app, req, res) {
    res.clearCookie('token').redirect('/');
};

/**
 * Deleta a conta do usuário logado
 */
module.exports.deleteAccount = async function (app, req, res) {
    const token = req.cookies['token'];
    const usersModel = require('../models/usuariosModel');

    if (token) {
        const tokenDecoded = jwtDecode(token);

        // Deleta usuário no banco
        const statusDeleteUser = await usersModel.deleteUsuarioID(tokenDecoded.id);

        // Remove cookie
        res.clearCookie('token');

        if (statusDeleteUser) {
            return res.redirect('/register');
        }
    } else {
        // Usuário não logado → redireciona para login
        res.redirect('/login');
    }
};
