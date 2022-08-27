const Chat = require("../models/Chat");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newChat = new Chat(req.body);

  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json("Chat has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CHAT
router.get("/find/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/sender/:senderId", async (req, res) => {
  try {
    const posts = await Chat.find({ sender: req.params.senderId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/find/receiver/:receiverId", async (req, res) => {
    try {
      const posts = await Chat.find({ receiver: req.params.receiverId });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL CHATS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let chats;

    if (qNew) {
      chats = await Chat.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      chats = await Chat.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      chats = await Chat.find();
    }

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
