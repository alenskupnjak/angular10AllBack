'use strict';
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER_NAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `${AlenAngular10} <${process.env.FROM_EMAIL}>`, // sender address
    to: `${options.email}`, // list of receivers
    subject: `${options.subject}`, // Subject line
    text: `${options.html}`, // plain text body
    html: `${options.html}`, // html body
  });
};

module.exports = sendEmail;
