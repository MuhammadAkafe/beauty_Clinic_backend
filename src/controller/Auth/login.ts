import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { create_user_response } from "../../types/Response";
import { AppDataSource } from "../../data-source/data-source";
import { Users } from "../../entity/Users";
import { LoginRequestBody } from "../../types/Request";
import fs from 'fs';
import path from 'path';

// Read the private key from the generated key file
const privateKeyPath = path.join(__dirname, '../../../keys/private.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

if (!privateKey) {
    throw new Error('Private key file not found or empty');
}

const validateLogin = async (email: string, password: string) => {
    const user = await AppDataSource.manager.findOne(Users, { where: { email } });
    if (!user) {
        return false;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

const login = async (req: Request<{},{},LoginRequestBody>, res: Response): Promise<Response<create_user_response>> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }
        const isPasswordValid = await validateLogin(email, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        const user = await AppDataSource.manager.findOne(Users, { where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        const token = jwt.sign({ email, isAdmin: user.isAdmin }, privateKey, { algorithm: 'RS256', expiresIn: '20s' });
        const refreshToken = jwt.sign({ email, isAdmin: user.isAdmin }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
        
        return res
            .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
            .json({ message: "login successful", success: true, accessToken: token });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export default login;
