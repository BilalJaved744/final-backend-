const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/user");
const Message = require("../Models/message");
dotenv.config();


async function authenticate(req, res, next) {
    try {
        console.log("🔐 Token Header Key:", process.env.JWT_TOKEN_HEADER); // ← check key
        console.log("📥 Received Token:", req.header(process.env.JWT_TOKEN_HEADER)); // ← check value
        const token = req.header(process.env.JWT_TOKEN_HEADER);
         
        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }
        
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenData) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = {
            _id: tokenData._id,
            FirstName: tokenData.FirstName,
            LastName: tokenData.LastName,
            Email: tokenData.Email,
            RoleName: tokenData.RoleName,
        };
        return next();
    } catch (error) {
        console.error(error.name);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Authentication failed. Invalid or expired token." });
        }
        return res.status(500).json({ message: error.message });
    }
}



async function isAdmin(req, res, next) {
    const currentUser = req.user;
    if (currentUser.RoleName == "admin"){
        return next();
    } 
    return res.status(401).json(new Message("your are not authorized, login with admin role", 401));
}



module.exports = {
    authenticate,
    isAdmin
}