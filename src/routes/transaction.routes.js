const {Router}=require('express');
const { authMiddleware, authSystemUserMiddleware } = require('../middlewares/auth.middleware');
const { createTransation, createInitialFundsTransaction } = require('../controllers/transaction.controller');
const transactionsRoutes=Router();

/**
 * -POST /api/transactions/
 * -Create a new transaction
 */
transactionsRoutes.post('/',authMiddleware,createTransation);

/**
 * -POST /api/transactions/system/initial-funds
 * -Create initial funds transaction from system user
 */

transactionsRoutes.post("/system/initial-funds",authSystemUserMiddleware,createInitialFundsTransaction)

module.exports=transactionsRoutes
