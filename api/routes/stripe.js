// import Stripe from 'stripe';
// const Stripe = require("stripe");
const router = require("express").Router();

// const stripe = require("stripe")(process.env.STRIPE_KEY);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LKTEFC5XWsBcsgy0shh5BxWMnQswzr1k8aMi8cddm9IViJFIC8gTP7WwLXxmDePEkCGrVahfMVrPhYZDr4cYDXb00QOWoXM05');
const Payment = require('../models/Payment');
// const stripe  = Stripe(process.env.STRIPE_SECRET, { apiVersion: "2020-08-27" });

// router.post("/payment", (req, res) => {
//   console.log(stripe);
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

router.post("/create-payment-intent", async (req, res) => {
  console.log("Payment hari");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, //lowest denomination of particular currency
      currency: req.body.currency,
      payment_method_types: ["card"], //by default
    });

    
    const clientSecret = paymentIntent.client_secret;
    console.log(clientSecret);

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

//create new payment
router.post("/", async (req, res) => {
  console.log("Payment eka save kala");
  const payment = new Payment(req.body);

  try {
    const savedPost = await payment.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    // const Category = await Category.findById(req.params.id);
    const payment = await Payment.findById(req.params.id);
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const payments = query
      ? await Payment.find().sort({ _id: -1 }).limit(5)
      : await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
