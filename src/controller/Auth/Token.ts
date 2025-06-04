import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;


 const verify_token = (req: Request, res: Response, next: NextFunction) => {

    try{
        const authHeader = req.headers.authorization;
        if(!authHeader)
            {
                return res.status(401).json({ message: "Unauthorized" ,success: false});
            }
        
        const token = authHeader.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({ message: "Unauthorized" ,success: false});
        }
        if(!privateKey)
            {
                return res.status(401).json({ message: "Unauthorized" ,success: false});
            }
        const decoded = jwt.verify(token, privateKey as string);
        next();
    }
    catch(error)
    {
        return res.status(401).json({ message: "Unauthorized" ,success: false});
    }
}

export default verify_token;