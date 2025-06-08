import { AppDataSource } from "../../data-source/data-source";
import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { GetAllServicesResponse } from "../../types/Response";
import { Users } from "../../entity/Users";

const get_all_services = async (req: Request<{user_id:string}>, res: Response): Promise<Response<GetAllServicesResponse>> => {
    try {

        const {user_id}=req.params;

        if(!user_id)
        {
            return res.status(400).json({ message: "User ID is required",success: false });
        }

        const userRepository = await AppDataSource.getRepository(Users).findOne({
            where: { user_id: parseInt(user_id) }
        });

        if(!userRepository)
        {
            return res.status(400).json({ message: "User not found",success: false });
        }
        
        const services = await AppDataSource.getRepository(Services)
            .find({
                relations: ['items'],
                where: { user_id: parseInt(user_id) }
            });

        if (!services?.length) {
            return res.status(404).json({ 
                message: "No services found", 
                success: false 
            });
        }
        
        return res.status(200).json(
            { 
            message: "Services fetched successfully", 
            success: true, 
            services 
        });
    } 
    catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}

export default get_all_services;
