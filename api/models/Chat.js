const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: [
        {
          _id: {
            type: String,
          },
          name: {
            type: String,
          },
          avatar: {
            type: String,
          },
        },
      ],
      sender: {type: String, default: null},
      receiver: {type: String, default: null},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);