"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../../entity/Users");
const data_source_1 = __importDefault(require("../../data-source/data-source"));
const createUser = async (username, email, password) => {
    try {
        // Check if the user already exists
        const user = await data_source_1.default.manager.findOne(Users_1.Users, { where: { email } });
        if (user) {
            throw new Error("User already exists");
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = new Users_1.Users();
        newUser.username = username;
        newUser.email = email;
        newUser.password = hashedPassword;
        // Save the user to the database
        await data_source_1.default.getRepository(Users_1.Users).save(newUser);
        return newUser;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("User registration failed");
    }
};
const register = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        if (!username || !email || !password || !confirm_password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Password and confirm password do not match", success: false });
        }
        const newUser = await createUser(username, email, password);
        if (!newUser) {
            return res.status(400).json({ message: "User registration failed", success: false });
        }
        return res.status(200).json({ message: `User registered successfully  ${newUser.user_id}`, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: `Internal server error ${error.message}`, success: false });
    }
};
exports.default = register;
