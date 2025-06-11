"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error('PRIVATE_KEY is not set in environment variables');
}
const verify_token = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        if (!privateKey) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};
exports.default = verify_token;
