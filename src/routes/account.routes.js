const express = require("express");
const {
  createAccountController,
} = require("../controllers/account.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * -POST /api/accounts
 * -Create a new account
 * -Proctected Route
 */
router.post("/", authMiddleware, createAccountController);

module.exports = router;
