"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return;
};
const register = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        if (!username || !email || !password || !confirm_password) {
            res.status(400).json({ message: "Email and password are required", success: false });
            return;
        }
        if (password !== confirm_password) {
            res.status(400).json({ message: "Password and confirm password do not match", success: false });
            return;
        }
        const newUser = await createUser(username, email, password);
        res.status(400).json({ message: "User registration failed", success: false });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}`, success: false });
    }
};
exports.default = register;
