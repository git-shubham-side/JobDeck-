const mongoose = require("mongoose");
const connect = require("../DB Connection/db");
const validator = require("validator");
const bcrypt = require("bcrypt");
connect();

// Function to set the first letter of every word in capital letter
function capitalizeName(value) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const recruiterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name."],
      match: [/^[A-Za-z ]+$/, "Name can only contain letters and spaces."],
      trim: true,
      set: capitalizeName,
    },
    designation: {
      type: String,
      required: [true, "Please enter your designation."],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is not provided."],
      trim: true,
    },
    companyWebsite: {
      type: String,
      required: [true, "Please enter your company website URL."],
      trim: true,
      validate: {
        validator: (value) =>
          validator.isURL(value, { require_protocol: true }),
        message:
          "Please enter a valid company website URL (must include http:// or https://).",
      },
    },
    companySize: {
      type: String,
      required: [true, "Please select your company size."],
      enum: {
        values: ["1-10", "11-50", "51-200", "201-500", "500+"],
        message: "{VALUE} is not a valid company size.",
      },
    },
    workEmail: {
      type: String,
      required: [true, "Please enter a work email address."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },
    terms: {
      type: Boolean,
      required: [true, "Please accept the terms and conditions."],
      validate: {
        validator: (value) => value === true,
        message: "You must accept the terms and conditions.",
      },
    },
    role: {
      type: String,
      default: "recruiter",
      immutable: true,
    },
  },
  { timestamps: true },
);

// Hash password before saving (only if it was modified)
recruiterSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    next(err);
  }
});

// Instance method to compare entered password with hashed password
recruiterSchema.methods.comparePassword = async function (recuriterPassword) {
  return bcrypt.compare(recuriterPassword, this.password);
};

const Admin = mongoose.model("Admin", recruiterSchema);

module.exports = Admin;
