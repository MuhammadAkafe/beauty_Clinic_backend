import { AppDataSource } from "../../data-source/data-source";
import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { GetAllServicesResponse } from "../../types/Response";

const get_all_services = async (req: Request, res: Response): Promise<Response<GetAllServicesResponse>> => {
    try {
        const services = await AppDataSource.getRepository(Services)
            .find({
                relations: ['items']
            });

        if (!services?.length) {
            return res.status(404).json({ 
                message: "No services found", 
                success: false 
            });
        }
        
        return res.status(200).json({ 
            message: "Services fetched successfully", 
            success: true, 
            services 
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}

export default get_all_services;
