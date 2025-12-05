const { jwtDecode } = require('jwt-decode');

module.exports.renderPageLogin = function(app,req,res) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);
        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            res.render('admin/admin');
        }
    } else {
        res.render('admin/login');
    }
}
module.exports.getAllUsers = async function(app,req,res,type) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);

        const usuariosModel = require('../models/usuariosModel');
        const usuarios = await usuariosModel.getUsuarios();

        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            if(type == 'json') { // retorna os dados em json
                res.json(usuarios);
            } else if(type == 'body') { // retorna os dados no body
                res.render('admin/get-all-users.html', {usuarios: usuarios});
            }
        } else { // manda para o login admin
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
}
module.exports.autenticarAdmin = function(app,req,res) {
    const jwt = require('jsonwebtoken');

    const USUARIO = process.env.USUARIO_ADMIN;
    const PASSWORD = process.env.PASSWORD_ADMIN;
    const SECRET = process.env.SECRET;

    const data = req.body;

    if (data.user === USUARIO && data.password === PASSWORD) {
        // Gera JWT com expiração de 1 hora
        const token_admin = jwt.sign({ user: data.user }, SECRET, { expiresIn: '1h' });

        // Cria cookie seguro
        res.cookie('admin_token', token_admin, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            sameSite: 'lax'
        });

        res.render('admin/admin');
    } else {
        res.redirect('/');
    }

}
module.exports.deletarUsuario = async function(app,req,res) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);

        const usuariosModel = require('../models/usuariosModel');

        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            const idBody = req.body.id;

            await usuariosModel.deleteUsuarioID(idBody);
            res.redirect('/admin/getAllUsers')

        } else { // manda para o login admin
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
}
module.exports.renderCreateProduct = function(app,req,res) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);
        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            res.render('admin/create-product.html');
        }
    } else {
        res.redirect('/admin');
    }
}
module.exports.createProduct = async function(app,req,res) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);
        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            const data = req.body;

            const produtosModel = require('../models/produtosModel');
            const produtoCriado = await produtosModel.createProduct(data);
            if (produtoCriado != false) { // produto criado com sucesso
                res.redirect('/admin/createProduct');
            }
        }
    } else {
        res.redirect('/admin');
    }
}
module.exports.getProdutos = async function(app,req,res,type) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);
        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            const data = req.body;

            const produtosModel = require('../models/produtosModel');
            const produtos = await produtosModel.getProdutos();
            
            if(type == 'json') {
                res.json(produtos);
            } else if(type == 'body') {
                res.render('admin/get-all-produtos', {produtos: produtos});
            }
        }
    } else {
        res.redirect('/admin');
    }
}
module.exports.deleteProduto = async function(app,req,res) {
    const tokenAdmin = req.cookies['admin_token'];

    if(tokenAdmin) {
        const tokenAdminDecoded = jwtDecode(tokenAdmin);

        const produtosModel = require('../models/produtosModel');

        if(tokenAdminDecoded.user == process.env.USUARIO_ADMIN) { // verifica token de admin
            const idBody = req.body.id;

            await produtosModel.deleteProdutoID(idBody);
            res.redirect('/admin/getProdutos');

        } else { // manda para o login admin
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
}