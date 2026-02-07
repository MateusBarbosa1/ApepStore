const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));

app.get("/heath", (req, res) => res.json({ ok: true }));

const routesPath = path.join(__dirname, "routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    try {
      require(path.join(routesPath, file))(app);
      console.log("Loaded route:", file);
    } catch (err) {
      console.error("Erro ao carregar rota:", file);
      console.error(err);
    }
  }
});

app.use(async (req, res) => {
  const { jwtDecode } = require("jwt-decode");
  const token = req.cookies["token"];

  if (token) {
    try {
      const usuariosModel = require("./models/usuariosModel");
      const tokenDecoded = jwtDecode(token);
      const usuario = await usuariosModel.getUsuarioID(tokenDecoded.id);

      if (usuario.length !== 0) {
        const firstName = usuario[0].nome.split(" ")[0];
        return res.status(404).render("404", { nome: firstName });
      }
    } catch (err) {
      res.clearCookie("token");
    }
  }

  return res.status(404).render("404", { nome: false });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("server running on port 3000!");
});
