const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
    if(file.endsWith('.js')) {
        require(path.join(routesPath, file))(app);
    }
});

app.listen(3000, () => console.log("server running on port 3000!"));
