const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const urlSchema = mongoose.Schema({
  originalURL: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 },
  created: { type: Date, default: Date.now() },
  shortURL: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(6),
  },
});

const URL_model = mongoose.model("URL", urlSchema);

module.exports = { URL_model };
