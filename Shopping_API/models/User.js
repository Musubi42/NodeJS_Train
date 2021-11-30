const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true // Cannot replicate this user name
    },
    email: {
      type: String,
      required: true,
      // unique: true
    }, //
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UsersSchema);
