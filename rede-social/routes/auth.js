const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const { register, login } = require("../Controller/AuthController.js");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attemps, please try again later.",
});

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must have at least 5 characters"),
    body("name").notEmpty().withMessage("name is mandatory"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

router.post(
  "/login",
  loginLimiter,
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is mandatory"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
