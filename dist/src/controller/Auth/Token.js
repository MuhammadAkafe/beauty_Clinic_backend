"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Read the private key from the generated key file
const privateKeyPath = path_1.default.join(__dirname, '../../../keys/private.pem');
const privateKey = fs_1.default.readFileSync(privateKeyPath, 'utf8');
if (!privateKey) {
    throw new Error('Private key file not found or empty');
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
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};
exports.default = verify_token;
