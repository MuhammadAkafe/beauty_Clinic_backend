import  AppDataSource  from "../../data-source/data-source";
import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { DeleteServiceResponse } from "../../types/Response";
import { PathParams } from "../../types/Request";

const delete_service = async (req: Request<PathParams>, res: Response): Promise<Response<DeleteServiceResponse>> => {
    try {
        const { service_id } = req.params;
        if (!service_id) {
            return res.status(400).json({ 
                message: "Service ID is required", 
                success: false 
            });
        }
        const serviceRepository = await AppDataSource.getRepository(Services).findOne({
            where: { service_id: service_id }
        });

        if(!serviceRepository)
        {
            return res.status(400).json({ message: "Service not found",success: false });
        }

        await AppDataSource.createQueryBuilder().delete().from(Services).where(
            " service_id = :service_id", { service_id }).execute();



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
