const express = require("express");
const path = require("path");
const port = 3000;

const expressSession = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser")

const app = express();
require("./config/passport");

//setting
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(
  expressSession({
    secret: "UTS",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index.router"));
app.use(require("./routes/login.router"));
app.use(require("./routes/dashboard.route"));
app.use(require("./routes/client/client.router"));

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.user = req.user;
  next();
});

app.listen(port, () => {
  console.log(`Enter to http://localhost:${port}`);
});
