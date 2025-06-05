import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source/data-source";
import { Items } from './../../entity/Items';
import { AddServiceResponse } from "../../types/Response";
import { Users } from "../../entity/Users";
import { AddServiceRequestBody, PathParams } from "../../types/Request";


export const Add_Service = async (req: Request<PathParams, {},AddServiceRequestBody>, res: Response):
 Promise<Response<AddServiceResponse>> => {
    try {
        // Check if database is initialized
        if (!AppDataSource.isInitialized) 
            {
            await AppDataSource.initialize();
            }

        const { title, sub_title,status } = req.body;
        const {user_id} = req.params;

        if(!user_id)
        {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
            });
        }

        const userRepository = await AppDataSource.getRepository(Users).findOne({
            where: { user_id: user_id }
        });


        if(!userRepository)
        {
            return res.status(400).json({
                message: "User not found",
                success: false,
                user: userRepository
            });
        }


        const service = new Services();
        service.title = title;
        service.sub_title = sub_title;
        service.status = status;
        service.user_id = user_id;
        // Create and save the service first
        const serviceRepository = AppDataSource.getRepository(Services);
        const savedService = await serviceRepository.save(service);

        return res.status(200).json({ 
            message: "Service added successfully", 
            success: true, 
            service: savedService 
        });
    } 
    catch (error:any) {
        console.error("Detailed error:", error);
        return res.status(500).json({ 
            message: `Internal server error ${error}`, 
            success: false,
        });
    }
}
