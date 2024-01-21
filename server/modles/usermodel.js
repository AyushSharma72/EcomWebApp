const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Answer: {
      type: String,
      required: true,
    },
    Address:{
      type: String,
      required: true,
    },
    Role: {
      type: Number,
      required: true,
      default: 0, 
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UserSchema);
