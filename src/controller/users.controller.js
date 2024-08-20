const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/Nodemailer");

const varifyaccesRefTokan = async (id) => {
    try {
        const user = await Users.findById(id)
        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid request"
            })
        }
        const accesstoken = await jwt.sign(
            {
                _id: user._id,
                role: user.role,
                expiresIn: 3600000
            },
            process.env.ACCESS_TOKEN_AUTH_SECRET,
            { expiresIn: '1 hour' }
        );

        const refreshToken = await jwt.sign(
            { _id: user._id, },
            process.env.ACCESS_TOKEN_AUTH_SECRET,
            { expiresIn: "10 day" }
        )

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accesstoken, refreshToken }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const register = async (req, res) => {
    try {
        // console.log(req.file);

        const { email, password } = req.body
        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist."
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const userData = await Users.create({ ...req.body, password: hashPassword }) //, avatar: req.file.path 

        if (!userData) {
            return res.status(500).json({
                success: false,
                message: "Create Hash Password Error."
            })
        }
        const userDataF = await Users.findById({ _id: userData._id }).select("-password")

        if (!userDataF) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error." + error.message
            })
        }
        // sendMail();
        res.status(201).json({
            success: true,
            message: "Register Successfully.",
            data: userDataF
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error." + error.message
        })
    }
}

const registerOTP = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "otp is sending Successfully."
    })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not exist"
            })
        }

        const validaccestokan = await bcrypt.compare(password, user.password)
        console.log(validaccestokan);

        if (!validaccestokan) {
            return res.status(400).json({
                success: false,
                message: "invalid password"
            })
        }

        const { accesstoken, refreshToken } = await varifyaccesRefTokan(user._id)

        console.log({ accesstoken, refreshToken });
        const userDataF = await Users.findById({ _id: user._id }).select("-password -refreshToken")

        const optionAcc = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
        };

        const optionRef = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 10 * 1000,
        };

        res.status(200)
            .cookie("accesstoken", accesstoken, optionAcc)
            .cookie("refreshToken", refreshToken, optionRef)
            .json({
                success: true,
                message: "data fetch successfully.",
                data: { ...userDataF.toObject(), accesstoken }
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const newToken = async (req, res) => {
    try {
        // console.log("new token", req.cookies.refreshToken);

        const tokandata = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        console.log("new token", tokandata);
        if (!tokandata) {
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }
        const user = await Users.findById({ _id: tokandata._id }).select("-password -refreshToken");
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }

        const { accesstoken, refreshToken } = await varifyaccesRefTokan(user._id);
        console.log({ accesstoken, refreshToken });

        const option = {
            httpOnly: true,
            secure: true
        };

        res.status(200)
            .cookie("accesstoken", accesstoken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "data fetch successfully.",
                data: { accesstoken }
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        console.log("logout", req.body._id);
        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not logged In.'
            });
        }
        console.log(user);

        res.status(200)
            .clearCookie('accesstoken')
            .clearCookie('refreshToken')
            .json({
                success: true,
                message: 'Logout successful.'
            });
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Logout failed.'
        });
    }
};

const checkAuth = async (req, res) => {
    try {
        const accesstoken = req.cookies.accesstoken;
        console.log(accesstoken);

        if (!accesstoken) {
            return res.status(401).json({
                success: false,
                message: 'Token is Not Found.'
            });
        }

        const validateUser = await jwt.verify(accesstoken, process.env.ACCESS_TOKEN_AUTH_SECRET);
        console.log(validateUser);

        if (!validateUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Token or Token is Expired.'
            });
        }

        res.status(200).json({
            success: true,
            data: validateUser,
            message: 'User is Authenticated.'
        })

    } catch (error) {
        console.error('Check auth error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Authentication failed.'
        })
    }
}

module.exports = {
    register,
    login,
    newToken,
    logout,
    registerOTP,
    checkAuth,
    varifyaccesRefTokan
}