const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, //username
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    selectUser: { type: Number, required: true },
    telephone_no: { type: String },
    img_url: { type: String, default: "none" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActivation: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
