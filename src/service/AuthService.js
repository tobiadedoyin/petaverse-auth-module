const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendVerificationMail } = require("../config/emailConfig");
const generateToken = require("../utils/generateToken");
const config = require("../config");

class AuthService {
  async register(data) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const verificationToken = generateToken();
    const newUser = new User({
      email: data.email,
      password: data.password,
      verificationToken,
    });
    await newUser.save();

    await sendVerificationMail(newUser, verificationToken);
    return newUser;
  }

  async verify(email, token) {
    const user = await User.findOne({ email });
    if (!user || user.verificationToken !== token) {
      throw new Error("Invalid token or email");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const accessToken = jwt.sign({ email: user.email }, config.SECRET);
    return accessToken;
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign({ email: user.email }, config.SECRET);
    return accessToken;
  }
}

module.exports = AuthService;
