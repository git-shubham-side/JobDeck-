const mongoose = require("mongoose");
const connect = require("../DB Connection/db");
const validator = require("validator");
const bcrypt = require("bcrypt");

connect();

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
      trim: true,
      lowercase: true,
      uppercase: false,
      minlength: 2,
      maxlength: 50,
      match: /^[A-Za-z ]+$/,
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
      trim: true,
      lowercase: true,
      uppercase: false,
      minlength: 2,
      maxlength: 50,
      match: /^[A-Za-z]+$/,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address."],
      unique: true,
      trim: true,
      lowercase: true,

      validate: {
        // Function to check the email
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
      select: false,
    },
    terms: {
      type: Boolean,
      required: true,
      validate: {
        validator: function terms(value) {
          return value === true;
        },
        message: "You must accept the Terms & Privacy Policy",
      },
    },
    profileUrl: {
      type: String,
      validate: validator.isURL,
      message: "Please enter a valid URL!",
    },
  },
  { timestamps: true },
);

//Pre Hook for Password Hashing
UserSchema.pre("save", async function () {
  //Check the password is modified in last save
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Method to check the password
UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//User Regestration Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
