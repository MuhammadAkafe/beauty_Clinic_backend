import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

// Read the private key from the generated key file
const privateKeyPath = path.join(__dirname, '../../../keys/private.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

if (!privateKey) {
    throw new Error('Private key file not found or empty');
}

const verify_token = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, privateKey);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
}

export default verify_token;