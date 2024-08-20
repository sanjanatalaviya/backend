const nodemailer = require("nodemailer");

const sendMail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjanatalaviya1011@gmail.com',
            pass: process.env.SEND_MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'sanjanatalaviya1011@gmail.com',
        to: 'ridhdhidudhat2003@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'sending mail for attachment demo......',
        attachments: [{
            filename: 'image',
            path: 'D:/download.jpg'
        },
        {
            filename: 'pdf',
            path: 'D:/fullstackProject/backend/e-commerce/public/document.pdf'
        }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendMail;