const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const stripeRoute = require("./routes/stripe");
const categoryRoute = require("./routes/categories");
const postRoute = require("./routes/post");
const chatRoute = require("./routes/chat");
const cors = require("cors");

//publish-key - pk_test_51LKTEFC5XWsBcsgy0nXH9vDEsMvsmjDznRBbQXVhH6PVbECbImSX18NEuk7Qu4QuDWEhkz2xGA0L0Qi8czIgeazn00OEVeVNs7
//secret-key - sk_test_51LKTEFC5XWsBcsgy0shh5BxWMnQswzr1k8aMi8cddm9IViJFIC8gTP7WwLXxmDePEkCGrVahfMVrPhYZDr4cYDXb00QOWoXM05


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/checkout", stripeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/chat", chatRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
