"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Generate RSA key pair
const { privateKey, publicKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});
// Create keys directory if it doesn't exist
const keysDir = path_1.default.join(__dirname, '../keys');
if (!fs_1.default.existsSync(keysDir)) {
    fs_1.default.mkdirSync(keysDir);
}
// Write keys to files
fs_1.default.writeFileSync(path_1.default.join(keysDir, 'private.pem'), privateKey);
fs_1.default.writeFileSync(path_1.default.join(keysDir, 'public.pem'), publicKey);
console.log('Keys generated successfully in the keys directory!');
