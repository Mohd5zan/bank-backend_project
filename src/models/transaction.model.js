const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      require: [true, "Transaction must be associated with a sender account"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      require: [true, "Transaction must be associated with a receiver account"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Status can either be PENDING,COMPLETED,FAILED or REVERSED",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "Amount needed"],
      min: [0, "Amount cannot be negative"],
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency Key is required for creating a transaction"],
        unique:true,
        index:true,
    }
  },
  { timestamps: true },
);

const transactionModel=mongoose.model('Transaction',transactionSchema);
module.exports=transactionModel;