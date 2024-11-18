import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';


export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    console.log("tokennnn", token);

    if (!token) {
        return res.status(403).send("Access denied, please login.");
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        console.log("verified", verified);
        req.user = verified;
        next();

    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }

};

