"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../../data-source/data-source");
const Users_1 = require("../../entity/Users");
const validateLogin = async (email, password) => {
    const user = await data_source_1.AppDataSource.manager.findOne(Users_1.Users, { where: { email } });
    if (!user) {
        return false;
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    return isPasswordValid;
};
// Read the keys
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error('PRIVATE_KEY is not set in environment variables');
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }
        const isPasswordValid = await validateLogin(email, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        const token = jsonwebtoken_1.default.sign({ email }, privateKey, { algorithm: 'RS256', expiresIn: '20s' });
        const refreshToken = jsonwebtoken_1.default.sign({ email }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
        return res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 }).
            json({ message: "login successful", success: true, accessToken: token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
exports.default = login;
