const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");

/**
 * -Create a new Transaction
 * THE 10-STEP TRANSFER FLOW:
 * 1.Validate Request
 * 2.Validate idempotency Key
 * 3.Check account status
 * 4.Derive Sender Balance from ledger
 * 5.Create Transaction (PENDING)
 * 6.Create DEBIT ledger entry
 * 7.Create CREDIT ledger entry
 * 8.Mark Transaction COMPLETED
 * 9.Commit MongoDB session
 * 10.Send email notification
 */

/**
 * 1.Validate request
 */
async function createTransation(req, res) {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message:
        "Invalid transcation fromAccount,toAccount,amount,idempotencyKey required",
    });
  }
  const fromUserAccount = await accountModel.findOne({
    _id: fromAccount,
  });
  const toUserAccount = await accountModel.findOne({
    _id: toAccount,
  });
  if (!fromUserAccount || !toUserAccount) {
    return res.status(400).json({
      message: "Invalid fromAccount or toAccount",
    });
  }


/**
 * 2.Validate idempotency Key
 */

const isTransactionAlreadyExists = await transactionModel.findOne({
  idempotencyKey: idempotencyKey,
});
if (isTransactionAlreadyExists) {
  if (isTransactionAlreadyExists.status === "COMPLETED") {
    return res.status(200).json({
      message: "Transaction already completed",
      transaction: isTransactionAlreadyExists,
    });
  }
  if(isTransactionAlreadyExists==='PENDING'){
    return res.status(200).json({
        message:"Transaction is still processing"
    })
  }
  if(isTransactionAlreadyExists==='FAILED'){
    return res.status(500).json({
        message:"transaction processing failed,please retry"
    })
  }
  if(isTransactionAlreadyExists==='REVERSED'){
    return res.status(500).json({
        message:"transaction processing reversed,please retry"
    })
  }
}

/**
 * 3.Validate Account Status
 */
if(fromUserAccount.status!=='ACTIVE' || toUserAccount!=='ACTIVE'){
    return res.status(400).json({
        message:"Both fromAccount and toAccount must be Active to process transaction"
    })
}

/**
 * 4.Derive sender balance from Ledger
 */

const balance=await fromUserAccount.getBalance();
if(balance<amount){
    return res.status(400).json({
        message:`Insufficient balance,Current balance is ${balance},Requested amount is ${amount}`
    })
}

/**
 *  5.Create Transaction (PENDING)
 */
const session =await mongoose.startSession()
session.startTransaction()
const transaction=await transactionModel.create({
    fromAccount,
    toAccount,
    amount,
    idempotencyKey,
    status:"PENDING"
},{session})

/**
 * 6.Create DEBIT ledger entry
 */
const debitLedgerEntry=await ledgerModel.create({
    account:fromAccount,
    amount:amount,
    transaction:transaction._id,
    type:"DEBIT"
},{session})

/**
 * 7.Create CREDIT ledger entry
 */

const creditLedgerEntry=await ledgerModel.create({
    account:toAccount,
    amount:amount,
    transaction:transaction._id,
    type:"CREDIT",
},{session})

/**
 * 8.Mark Transaction COMPLETED
 */
transaction.status="COMPLETED"
await transaction.save({session})

/**
 *  9.Commit MongoDB session
 */
await session.commitTransaction()
session.endSession()

/**
 * 10.Send email notification
 */
await emailService.sendTransactionEmail(req.user.email,req.user.name,amount,toAccount )
return res.status(201).json({
    message:"Transaction completed successfully",
    transaction:transaction
})
}

module.exports={
    createTransation
}