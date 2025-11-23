module.exports.renderLoginPage = function (app, req, res) {
  res.render("auth/login");
};
module.exports.renderRegisterPage = function (app, req, res) {
  res.render("auth/register");
};
module.exports.createUser = async function(app,req,res) {
  const data = req.body;

  const usersModel = require('../models/usuariosModel');
  const usuario = await usersModel.setUsuarios(data);

  console.log(usuario);
}