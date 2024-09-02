const express = require('express');
const { usersController } = require('../../../controller');
const passport = require('passport');
const exportpdfmake = require('../../../utils/Pdfmaker');
const { sendOTP, verifyOTP } = require('../../../utils/twilioOTP');
const upload = require('../../../middleware/upload');
const { varifyaccesRefTokan } = require('../../../controller/users.controller');

const router = express.Router();

router.post('/register',
    upload.single('avatar'),
    usersController.register
);

router.post('/registerOTP',
    sendOTP,
    usersController.registerOTP
);

router.post('/login',
    usersController.login
);

router.post('/newToken',
    usersController.newToken
);

router.post('/logout',
    usersController.logout
);

router.post('/sendemail',
    usersController.register
);

router.get('/checkAuth',
    usersController.checkAuth
);

router.get('/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("login successfully.");
        // Successful authentication, redirect home.
        // res.redirect('/');
        console.log("ggggggggggggggg");
        console.log(req.isAuthenticated());
        console.log(req.session);
        console.log("oooooooooooooooooooooo");
        // res.send("<h1>OK</h1>")
        if (req.isAuthenticated()) {

            const { accesstoken, refreshToken } = await varifyaccesRefTokan(req.session.passport.user._id)

            console.log({ accesstoken, refreshToken });

            const optionAcc = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 60 * 1000,
            };

            const optionRef = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 60 * 24 * 10 * 1000,
            };

            res.status(200)
                .cookie("accesstoken", accesstoken, optionAcc)
                .cookie("refreshToken", refreshToken, optionRef)
            res.redirect('http://localhost:3000');
        }
    });

router.get('/facebookLogin',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // res.redirect('/');
        res.send("<h1>OK</h1>");
    });

router.get('/pdfmake',
    exportpdfmake
);

router.get('/sendotp',
    verifyOTP,
    usersController.registerOTP
);

router.get('/list-user',
    usersController.listuser
);

router.get('/get-user/:_id',
    usersController.getuser
);

router.get('/order/:_id',
    usersController.orderofuser
);

router.put('/update-user/:_id',
    usersController.updateUser
)

router.delete('/delete-user/:_id',
    usersController.deleteUser
)

module.exports = router;