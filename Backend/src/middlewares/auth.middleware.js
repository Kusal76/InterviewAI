const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    // 🔥 Check for token in cookies OR the Authorization Header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Please log in."
        });
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Session expired. Please log in again."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contains id and username
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
}

module.exports = { authUser };