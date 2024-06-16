const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers")(); // Ensure handlebars-helpers is installed

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false, // Change to true in production if using HTTPS
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({ helpers });

// Set template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Routes
app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
