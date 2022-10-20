const mongoose = require("mongoose");

const payments = mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    amount: String,
    installments: Boolean,
    paymentInstallments: Object,
    status: {
      type: String,
      default: "open",
    },
    staffPayments: [
      {
        assignStaff: { type: mongoose.Schema.Types.ObjectId, ref: "Staffs" },
        remainingBalance: Number,
        salary: String,
        date: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ClientPayments", payments);
