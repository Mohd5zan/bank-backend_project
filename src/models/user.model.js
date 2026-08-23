const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a Username"],
      minLength: [4, "It should be atleast 4 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      trim: true,
      unique: true,
      minLength: [6, "It should be atleast 4 characters"],
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      minLength: [6, "password should be atleast 6 characters long...."],
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  //cant use next with async
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
