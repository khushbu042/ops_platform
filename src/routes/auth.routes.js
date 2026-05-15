const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { loginLimiter,} = require("../middleware/rateLimit.middleware");

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);

module.exports = router;