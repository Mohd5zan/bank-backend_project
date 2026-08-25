const {Router}=require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { createTransation } = require('../controllers/transaction.controller');
const transactionsRoutes=Router();

/**
 * -POST /api/transactions/
 * -Create a new transaction
 */
transactionsRoutes.post('/',authMiddleware,createTransation);

/**
 * -POST /api/
 */

module.exports=transactionsRoutes
