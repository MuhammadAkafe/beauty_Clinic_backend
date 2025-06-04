import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source/data-source";
import { Items } from './../../entity/Items';
import { AddServiceResponse } from "../../types/Response";


export const Add_Service = async (req: Request, res: Response): Promise<Response<AddServiceResponse>> => {
    try {
        // Check if database is initialized
        if (!AppDataSource.isInitialized) 
            {
            await AppDataSource.initialize();
            }

        const { title, sub_title, items,status } = req.body;
        const service = new Services();
        service.title = title;
        service.sub_title = sub_title;
        service.status = status;
        // Create and save the service first
        const serviceRepository = AppDataSource.getRepository(Services);
        const savedService = await serviceRepository.save(service);

        // Create items if provided
        if (items && Array.isArray(items)) {
            const itemsRepository = AppDataSource.getRepository(Items);
            const itemsToSave = items.map((item) => {
                const newItem = new Items();
                newItem.type = item.type;
                newItem.price = item.price;
                newItem.service = savedService;
                return newItem;
            });
            await itemsRepository.save(itemsToSave);
        }

        // Fetch the complete service with items
        const completeService = await serviceRepository.findOne(
            {
            where: { service_id: savedService.service_id },
            relations: { items: true }
        });

        return res.status(200).json({ 
            message: "Service added successfully", 
            success: true, 
            service: completeService 
        });
    } 
    catch (error:any) {
        console.error("Detailed error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false,
        });
    }
}
