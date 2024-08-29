// emailService.js
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
         user: process.env.EMAIL, 
         pass: process.env.PASSWORD 
    }
});


const sendEmail = (to, subject, html, filePath) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html,
        attachments: [
            {
                filename: path.basename(filePath), 
                path: filePath // Path to the file 
            }
        ]
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
