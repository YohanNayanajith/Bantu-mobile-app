const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postTitle: { type: String, required: true },
    category: { type: String, required: true },
    postDetail: { type: String, required: true },
    userID: { type: String, required: true },
    assigned_userID: { type: String, default: null },
    noOfLikes: { type: Number, default: 0 },
    date: { type: Date, required: true },
    expire_date: { type: Date, required: true },
    time: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    is_assign: { type:Boolean, default: false },
    payment_success: { type:Boolean, default: false },
    is_complete: { type:Boolean, default: false },
    rate: { type: Number, default: 0 },
    address: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);