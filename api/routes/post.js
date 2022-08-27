const Post = require("../models/Post");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updatedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     res.status(200).json("Post has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
})

//GET USER POSTS
router.get("/find/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ assigned_userID: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/data/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // const { password, ...others } = user._doc;
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER POSTS ASSIGN
router.get("/find/assign/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userID: req.params.userId });
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
