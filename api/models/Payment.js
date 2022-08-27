const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    canceledAt: { type: String, required: true, },
    captureMethod: { type: String, required: true },
    clientSecret: { type: String },
    confirmationMethod: { type: String, },
    created: { type: String },
    currency: { type: String },
    description: { type: String },
    id: { type: String, required: true },
    lastPaymentError: { type: String },
    livemode: { type: String },
    nextAction: { type: String },
    paymentMethodId: { type: String },
    receiptEmail: { type: String },
    shipping: { type: String },
    status: { type: String },
    UserID: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);