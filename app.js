import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import utils from "./utils/utils.js";
import { router } from "./routes/router.js";
import "./handlers/passport.js";

// create express app
export const app = express();

// view engine setup
app.set("view engine", "ejs"); // We'll use ejs. Other options: pug, hbs, liquid etc.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // views folder is where we keep our ejs files

// Any files in public/ will be served as is (ex: images, css, etc.)
app.use(express.static(path.join(__dirname, "public")));

// takes raw requests and sticks them onto req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev")); // for logging requests
app.use(cookieParser()); // parses cookies and sticks them to req.cookies

// session middleware
app.use(
  session({
    secret: process.env.PASSPORT_SECRET, // remember to input this in .env
    key: process.env.PASSPORT_COOKIE_KEY, // remember to input this in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONN }), // store sessions in mongoDB (not in memory)
  })
);

// Passport is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.u = utils;
  res.locals.user = req.user || null; // if user is logged in, req.user will be set
  res.locals.currentPath = req.path; // current path (ex: /trucks)
  next();
});

app.use("/", router);
