const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true, // upgrade later with STARTTLS
  auth: {
    user: "spproacc3@gmail.com",
    pass: "vmah udyz uvbq vhwd",
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  await transporter.sendMail({
    from: 'spproacc3@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  });
};

module.exports = { sendVerificationEmail };

