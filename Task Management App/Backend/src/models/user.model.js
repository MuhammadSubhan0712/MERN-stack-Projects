import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email in lowercase"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    passowrd: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passsowrdConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.passowrd;
        },
        message: "Passwords are not the same!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "team-lead"],
      default: "user", //by default role = user
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

//Password hashing middleware:
userSchema.pre("save", async function (next) {
  if (!this.isModified("passowrd")) return next();
  this.passowrd = await bcrypt.hash(this.passowrd, 12);
  this.passsowrdConfirm = undefined;
  next();
});

//Method to compare passwords:
userSchema.method.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
