const dotenv = require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: String(process.env.MONGODB_URI),

  // EMAIL
  SMTP_SERVER: process.env.EMAIL_SERVER,
  SMTP_PORT: Number(process.env.EMAIL_PORT),
  SMTP_USERNAME: process.env.EMAIL_USERNAME,
  SMTP_PASSWORD: process.env.EMAIL_PASSWORD,

  //jwt
  SECRET: process.env.SECRET,
};

module.exports = config;
