'use strict';
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  console.log('options',options, process.env.MAILTRAP_USER_NAME,
  process.env.MAILTRAP_PASSWORD,);
  

  // new Promise((resolve, reject) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER_NAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // const text = htmlToText.fromString(options.html, {
  //   wordwrap: 130,
  // });

  // const mailOptions = {
  //   from: '"Haider Malik 👻" <noreplay@fulltsackhour.com>',
  //   to: options.email,
  //   subject: options.subject,
  //   text,
  //   html: options.html,
  // };

  let info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: `${options.email}`, // list of receivers
    subject: `${options.subject}`, // Subject line
    text: `${options.html}`, // plain text body
    html: `${options.html}`, // html body
  });

  // transpoter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return reject(error);
  //   }
  //   console.log('Message id ', info.messageId);
  //   console.log('Preview URL ', nodemailer.getTestMessageUrl(info));
  //   return resolve({ message: 'Reset Email has sent to your inbox' });
  // });
  // });
};


module.exports = sendEmail;
