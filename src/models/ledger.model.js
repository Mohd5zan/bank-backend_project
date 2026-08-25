const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account is required for creating ledger entry"],
      index: true,
      immutable: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required for ledger entry"],
      immutable: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      index: true,
      immutable: true,
      required: [true, "Ledger must be associated with transaction"],
    },
    type: {
      type: String,
      immutable: true,
      required: [true, "Ledger type is required"],
      enum: {
        values: ["CREDIT", "DEBIT"],
        message: "Type can either be CREDIT or DEBIT",
      },
    },
  },
  { timestamps: true },
);

function preventLedgerModification() {
  throw new Error("Ledger entries Cannot be modified or Deleted");
}
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);

const ledgerModel = mongoose.model("Ledger", ledgerSchema);
module.exports = ledgerModel;
