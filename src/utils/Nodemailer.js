const nodemailer = require("nodemailer");

const sendMail = (email, otp) => {
    console.log("Your OTP is :", otp);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjanatalaviya1011@gmail.com',
            pass: process.env.SEND_MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'sanjanatalaviya1011@gmail.com',
        to: 'sanjanatalaviya1011@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
        // 'sending mail for attachment demo......'
        // attachments: [{
        //     filename: 'image',
        //     path: 'D:/download.jpg'
        // },
        // {
        //     filename: 'pdf',
        //     path: 'D:/fullstackProject/backend/e-commerce/public/document.pdf'
        // }]
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