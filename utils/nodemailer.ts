const nodemailer = require("nodemailer");



export let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port:587,
  secure: true,
  auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS
  }
});
  