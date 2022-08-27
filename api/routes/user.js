const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");

//UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  if (req.body.confirm_password) {
    req.body.confirm_password = CryptoJS.AES.encrypt(
      req.body.confirm_password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/find", async (req, res) => {
  // console.log("mata katha kla");
  try {
    const user = await User.findById(req.body);
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/email", async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await User.find({ email: req.body.email });
    // console.log(user);
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const verifyUserByEmail = async (req, res, next) => {
//   const userEmail = req.params.userEmail;
//   console.log("First Step");
//   try {
//     const user = await User.find({ email: userEmail });
//     req.user = [...req , user._id];
//     console.log("second");
//     console.log( req.user);
//     next();
//   } catch (error) {
//     res.status(500).json(err);
//   }
// };

// router.put("/email/:userEmail",verifyUserByEmail, async (req, res) => {
//   console.log("Third Step");
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.body._id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     console.log("Fourth Step");
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/email/:id", async (req, res) => {
//   console.log(req.params.id);
//   try {
//     const user = await User.find({email:req.params.id});
//     console.log(user);
//     // const { password, ...others } = user._doc;
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL USER
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/send/email", async (req, res) => {
  console.log(req.body.email);
  const msg = {
    from: "yohannayanajith40@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };

  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: "yohannayanajith40@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
      port: 465,
      host: "smtp.gmail.com",
    })
    .sendMail(msg, (err) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json("Email Sent");
      }
    });
});

module.exports = router;
