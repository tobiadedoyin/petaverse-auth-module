const nodemailer = require("nodemailer");
const config = require("./index");

const transporter = nodemailer.createTransport({
  host: config.SMTP_SERVER,
  port: Number(config.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: config.SMTP_USERNAME,
    pass: config.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: '"petaverse" <oladeletobiadedoyin@gmail.com>',
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

const sendVerificationMail = async (user, verificationToken) => {
  if (!user.email) {
    throw new Error("User email not found");
  }
  const subject = "Verification Token";
  const htmlContent = `Please verify your email by entering the following token: ${verificationToken}`;
  await sendEmail(user.email, subject, htmlContent);
};

module.exports = {
  sendVerificationMail,
};
