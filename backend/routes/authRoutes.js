const express = require("express");
const users = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", users.register);
router.post("/login", users.login);
router.post("/forgot-password", users.sendResetPasswordEmail);
router.post("/reset-password", users.resetPassword);
router.post("/send-otp", users.sendOTP);

module.exports = router;
