import userHandler from "../handlers/userHandler.js";
import { body, validationResult } from "express-validator";

const loginForm = async (req, res) => {
  res.render("login", { title: "Login" });
};

const resetPassword = async (req, res) => {
  res.render("resetPassword", { title: "Forgot Password?" });
};

const registerForm = async (req, res) => {
  res.render("register", { title: "Register" });
};

const validateRegister = [
  body("username").notEmpty().withMessage("Email address is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirm-password")
    .isLength({ min: 6 })
    .withMessage("Confirm Password must be at least 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors: ", errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

const register = async (req, res) => {
  console.log("in register");
  const callback = (err, newUser) => {
    if (err) {
      res.redirect("/register");
    } else {
      res.redirect("/login");
    }
  };

  userHandler.register({
    username: req.body.username,
    password: req.body.password,
    callback,
  });
};

export default {
  loginForm,
  resetPassword,
  registerForm,
  register,
  validateRegister,
};
