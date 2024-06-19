const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(3).toString("hex");
};

module.exports = generateToken;
