const express = require("express");
const {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController,
} = require("../controllers/account.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * -POST /api/accounts
 * -Create a new account
 * -Proctected Route
 */
router.post("/", authMiddleware, createAccountController);

/**
 * -GET /api/accounts/
 * -GET all accounts of the logged-in User
 * -Protected Route
 */
router.get("/", authMiddleware, getUserAccountsController);

/**
 * -GET /api/accounts/balance/:accountId
 * -Additional account routes can be added here 
 */

router.get("/balance/:accountId",authMiddleware,getAccountBalanceController)


module.exports = router;
