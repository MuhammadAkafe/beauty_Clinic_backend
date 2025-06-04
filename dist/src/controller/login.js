"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const validateLogin = async (email, password) => {
    return true;
};
// Read the keys
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '../keys/private.pem'), 'utf8');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required", success: false });
            return;
        }
        res.status(200).json({ message: "login successful", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
exports.default = login;
