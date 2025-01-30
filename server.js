const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));

require("./routes/home")(app);
require("./routes/auth")(app);

app.listen(3000, () => console.log("server running on port 3000!"));
