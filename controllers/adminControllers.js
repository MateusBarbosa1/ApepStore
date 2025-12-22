const { jwtDecode } = require("jwt-decode");
const path = require("path");
const fs = require("fs");

/**
 * Renderiza a página de login do admin
 */
module.exports.renderPageLogin = function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    // Verifica se é admin
    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      return res.render("admin/admin");
    }
  }

  // Não logado ou não é admin → login admin
  res.render("admin/login");
};

/**
 * Retorna todos os usuários (JSON ou HTML)
 */
module.exports.getAllUsers = async function (app, req, res, type) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    const usuariosModel = require("../models/usuariosModel");
    const usuarios = await usuariosModel.getUsuarios();

    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      if (type === "json") {
        return res.json(usuarios);
      } else if (type === "body") {
        return res.render("admin/get-all-users.html", { usuarios });
      }
    }
  }

  // Redireciona para login admin caso não autorizado
  res.redirect("/admin");
};

/**
 * Autentica o admin e cria token JWT
 */
module.exports.autenticarAdmin = function (app, req, res) {
  const jwt = require("jsonwebtoken");

  const USUARIO = process.env.USUARIO_ADMIN;
  const PASSWORD = process.env.PASSWORD_ADMIN;
  const SECRET = process.env.SECRET;

  const data = req.body;

  if (data.user === USUARIO && data.password === PASSWORD) {
    // Gera JWT com expiração de 1h
    const token_admin = jwt.sign({ user: data.user }, SECRET, {
      expiresIn: "1h",
    });

    // Cria cookie seguro
    res.cookie("admin_token", token_admin, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.render("admin/admin");
  }

  // Login incorreto → redireciona para home
  res.redirect("/");
};

/**
 * Deleta um usuário pelo ID
 */
module.exports.deletarUsuario = async function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      const idBody = req.body.id;
      const usuariosModel = require("../models/usuariosModel");

      await usuariosModel.deleteUsuarioID(idBody);
      return res.redirect("/admin/getAllUsers");
    }
  }

  res.redirect("/admin");
};

/**
 * Renderiza página de criação de produto
 */
module.exports.renderCreateProduct = function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);
    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      return res.render("admin/create-product.html");
    }
  }

  res.redirect("/admin");
};

/**
 * Cria um novo produto (com upload de imagem)
 */
module.exports.createProduct = async function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      const data = req.body;
      const file = req.file;
      let novoNome = "";

      if (file) {
        // Cria nome seguro para a imagem
        const categoriaSafe = (data.categoria || "geral")
          .replace(/\s+/g, "_")
          .replace(/[^\w\-]/g, "");
        const nomeSafe = (data.nome || "produto")
          .replace(/\s+/g, "_")
          .replace(/[^\w\-]/g, "");
        const novaExt = path.extname(file.originalname);
        novoNome = `${categoriaSafe}-${nomeSafe}${novaExt}`;

        const oldPath = file.path;
        const newPath = path.join(path.dirname(oldPath), novoNome);

        fs.renameSync(oldPath, newPath);
        data.imagem = novoNome;
      }

      const produtosModel = require("../models/produtosModel");
      await produtosModel.createProduct(data, novoNome);

      return res.redirect("/admin/createProduct");
    }
  }

  res.redirect("/admin");
};

/**
 * Retorna todos os produtos (JSON ou HTML)
 */
module.exports.getProdutos = async function (app, req, res, type) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);
    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      const produtosModel = require("../models/produtosModel");
      const produtos = await produtosModel.getProdutos();

      if (type === "json") return res.json(produtos);
      if (type === "body")
        return res.render("admin/get-all-produtos", { produtos });
    }
  }

  res.redirect("/admin");
};

/**
 * Deleta um produto e sua imagem
 */
module.exports.deleteProduto = async function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      const idBody = req.body.id;
      const produtosModel = require("../models/produtosModel");

      const produtoDeleted = await produtosModel.getProdutoID(idBody);
      await produtosModel.deleteProdutoID(idBody);

      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        "produtos",
        produtoDeleted[0].img
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.error("Erro ao deletar a imagem:", err);
        else console.log("Imagem deletada com sucesso!");
      });

      return res.redirect("/admin/getProdutos");
    }
  }

  res.redirect("/admin");
};

/**
 * Atualiza um produto existente
 */
module.exports.updateProduto = async function (app, req, res) {
  const tokenAdmin = req.cookies["admin_token"];

  if (tokenAdmin) {
    const tokenAdminDecoded = jwtDecode(tokenAdmin);

    if (tokenAdminDecoded.user == process.env.USUARIO_ADMIN) {
      const data = req.body;
      const produtosModel = require("../models/produtosModel");

      await produtosModel.updateProduto(data.id, data);
      return res.redirect("/admin/getProdutos");
    }
  }

  res.redirect("/admin");
};
