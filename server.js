require("dotenv").config();
require("./config/db_connection"); // database initial setup

const express = require("express");
const hbs = require("hbs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

const basePageRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const prodDelete = require("./routes/product_delete");
const prodCreate = require("./routes/product_create");
const prodEdit = require("./routes/product_edit");
const oneProd = require("./routes/oneProduct");

app.use(basePageRouter);
app.use("/", authRouter);
app.use(oneProd);
app.use(prodEdit);
app.use(prodDelete);
app.use(prodCreate);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
