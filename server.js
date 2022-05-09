const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(express.static("./public"));

const viewspath = path.join(__dirname, "./views/pages");
app.set("views", viewspath);
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(cookieParser("CarManagement"));
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`server nyala di port ${port}`);
});
