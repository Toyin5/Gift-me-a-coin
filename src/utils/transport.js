import nodemailer from "nodemailer";
import "dotenv/config";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_SECRET,
    refreshToken: process.env.OAUTH_REFRESH,
  },
});

export default transporter;
