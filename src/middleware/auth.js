const jwt = require("jsonwebtoken");
const Users = require("../model/users.model");

const auth = (roles = []) => async (req, res, next) => {
    try {
        // const token = req.cookies.accesstoken;
        const token = req.cookies.accesstoken || req.headers("Authorization")?.replace("Bearer ", "");
        // const t = req.headers("Authorization");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is required."
            });
        }

        try {
            const validateToken = await jwt.verify(token, process.env.ACCESS_TOKEN_AUTH_SECRET);
            // console.log(validateToken);

            const user = await Users.findById(validateToken._id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found."
                });
            }

            if (!roles.some((v) => v === user.role)) {
                return res.status(400).json({
                    success: false,
                    message: "You have no access."
                });
            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: "Invalid Token."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token is invalid."
        })
    }
};

module.exports = auth;