const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    isActivation: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
