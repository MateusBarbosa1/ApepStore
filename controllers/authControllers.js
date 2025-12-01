const usersModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const SECRET = process.env.SECRET;

module.exports.renderLoginPage = function (app, req, res) {
  const token = req.cookies["token"];

  if(token) {
    res.redirect('/');
  } else {
    res.render('auth/login', {err: false});
  }
};
module.exports.renderRegisterPage = function (app, req, res) {
  const token = req.cookies["token"];

  if(token) {
    res.redirect('/');
  } else {
    res.render('auth/register', {err: false});
  }
};
module.exports.createUser = async function(app,req,res) {
  const data = req.body;
  const usuario = await usersModel.setUsuarios(data);

  if(usuario == 'email') { // email ja cadastrado
    res.render('auth/register', {err: 'O email está vinculado a outra conta!'});
  } else { // criação bem sucedida
    const token = jwt.sign({
      id: usuario.id
    }, SECRET);
    res.cookie('token', token).redirect('/');
  }
}
module.exports.loginUser = async function(app,req,res) {
  const data = req.body;
  const usuario = await usersModel.getUsuarioEMAIL(data.email);

  if(usuario) { // usuario existe
    const validationPassword = bcrypt.compareSync(data.senha, usuario[0].senha);

    if(validationPassword) { // usuario autenticado
      const token = jwt.sign({
        id: usuario[0].id
      }, SECRET);
      res.cookie('token', token).redirect('/');
    } else { // usuario não autenticado
      res.render('auth/login', {err: 'Email ou Senha incorretos!'})
    }
  } else { // Email não existe
    res.render('auth/login', {err: 'Email ou Senha incorretos!'})
  }
}