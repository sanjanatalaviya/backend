
const sendOTP = (req, res, next) => {
    try {
        const accountSid = process.env.TWILIO_OTP_ACCOUNT_SID;
        const authToken = process.env.TWILIO_OTP_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        const otp = Math.floor(1000 + Math.random() * 9000);

        req.session.otp = otp;

        client.messages
            .create({
                body: otp,
                from: process.env.TWILIO_OTP_PHONE_NO,
                to: '+919737336742'
            })
            .then(message => next())

    } catch (error) {
        console.log("error in OTP.", error.message);
    }

};

const verifyOTP = (req, res, next) => {
    console.log("OTP is Correct.", req.session.otp);
    if (req.body.otp === req.session.otp) {
        next();
    } else {
        res.status(401).send({ message: "Invalid OTP" });
    }
}

module.exports = {
    sendOTP,
    verifyOTP
}