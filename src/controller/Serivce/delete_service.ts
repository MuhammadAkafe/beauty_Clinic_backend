import { AppDataSource } from "../../data-source/data-source";
import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { DeleteServiceResponse } from "../../types/Response";

const delete_service = async (req: Request<{ service_id: string }>, res: Response): Promise<Response<DeleteServiceResponse>> => {
    try {
        const { service_id } = req.params;
        
        if (!service_id) {
            return res.status(400).json({ 
                message: "Service ID is required", 
                success: false 
            });
        }

        const serviceRepository = AppDataSource.getRepository(Services);
        const service = await serviceRepository.findOne({
            where: { service_id: parseInt(service_id) }
        });

        if (!service) {
            return res.status(404).json({ 
                message: "Service not found", 
                success: false 
            });
        }
        
        await serviceRepository.remove(service);

        return res.status(200).json({ 
            message: "Service deleted successfully", 
            success: true 
        });
    } catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}

export default delete_service;
