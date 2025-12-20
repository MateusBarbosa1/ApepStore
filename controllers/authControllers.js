const usersModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const SECRET = process.env.SECRET;

/**
 * Renderiza a página de login
 */
module.exports.renderLoginPage = function (app, req, res) {
  const token = req.cookies["token"];

  // Usuário já logado → redireciona para home
  if (token) {
    return res.redirect('/');
  }

  // Usuário não logado → renderiza login
  res.render('auth/login', { err: false });
};

/**
 * Renderiza a página de registro
 */
module.exports.renderRegisterPage = function (app, req, res) {
  const token = req.cookies["token"];

  // Usuário já logado → redireciona para home
  if (token) {
    return res.redirect('/');
  }

  // Usuário não logado → renderiza registro
  res.render('auth/register', { err: false });
};

/**
 * Cria um novo usuário
 */
module.exports.createUser = async function (app, req, res) {
  const data = req.body;

  // Tenta cadastrar usuário no banco
  const usuario = await usersModel.setUsuarios(data);

  // Email já cadastrado
  if (usuario === 'email') {
    return res.render('auth/register', { err: 'O email está vinculado a outra conta!' });
  }

  // Cadastro bem-sucedido → gera token e redireciona
  const token = jwt.sign({ id: usuario.id }, SECRET);
  res.cookie('token', token).redirect('/');
};

/**
 * Login do usuário
 */
module.exports.loginUser = async function (app, req, res) {
  const data = req.body;

  // Busca usuário pelo email
  const usuario = await usersModel.getUsuarioEMAIL(data.email);

  if (usuario) {
    // Valida senha
    const validationPassword = bcrypt.compareSync(data.senha, usuario[0].senha);

    if (validationPassword) {
      // Usuário autenticado → gera token e redireciona
      const token = jwt.sign({ id: usuario[0].id }, SECRET);
      return res.cookie('token', token).redirect('/');
    }
  }

  // Email ou senha incorretos
  res.render('auth/login', { err: 'Email ou Senha incorretos!' });
};
