import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { create_user_response } from "../../types/Response";
import { Users } from "../../entity/Users";
import  AppDataSource  from "../../data-source/data-source";
import { RegisterRequestBody } from "../../types/Request";





const createUser = async (username: string, email: string, password: string) => {
    try {

        // Check if the user already exists
        const user = await AppDataSource.manager.findOne(Users, { where: { email } });
        if (user) {
            throw new Error("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Users();
        newUser.username = username;
        newUser.email = email;
        newUser.password = hashedPassword;

        // Save the user to the database
        await AppDataSource.getRepository(Users).save(newUser);
        return newUser;
    }
    catch (error: any) {
        console.log(error.message);
        throw new Error("User registration failed");
    }
}


const register = async (req: Request<{},{},RegisterRequestBody>, res: Response)
: Promise<Response<create_user_response>> => {
    try {
        const {username, email, password, confirm_password} = req.body;
        if (!username || !email || !password || !confirm_password) {
            return res.status(400).json({ message: "Email and password are required",success: false } );
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Password and confirm password do not match",success: false });
        }
        const newUser = await createUser(username, email, password);
        if(!newUser)
        {
            return res.status(400).json({ message: "User registration failed",success: false });
        }

        return res.status(200).json({ message: `User registered successfully  ${newUser.user_id}`,success: true });
    } 
    catch (error: any) {
        return res.status(500).json({ message: `Internal server error ${error.message}`,success: false });
    }
}

export default register;

