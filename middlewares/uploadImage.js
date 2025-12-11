const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, "../public/images/produtos");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Pegando dados do body
      const nomeProduto = req.body.nome || "produto";
      const categoria = req.body.categoria || "geral";

      // Substituindo espaços por underline e removendo caracteres inválidos
      const safeNome = nomeProduto.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
      const safeCategoria = categoria.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");

      // Montando o nome final
      const novoNome = `${safeCategoria}-${safeNome}${path.extname(file.originalname)}`;

      cb(null, novoNome);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype);
    if (extensaoImg) return cb(null, true);
    return cb(null, false);
  },
});
