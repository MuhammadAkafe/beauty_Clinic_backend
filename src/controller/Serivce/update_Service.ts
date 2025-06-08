import { Request, Response } from "express";
import { AppDataSource } from "../../data-source/data-source";
import { Services } from "../../entity/Service";
import { UpdateServiceRequest } from "../../types/Request";
import { UpdateServiceResponse } from "../../types/Response";
import { Items } from "../../entity/Items";

const update_service = async (req: Request<{service_id: number}, {}, UpdateServiceRequest>, res: Response): Promise<Response<UpdateServiceResponse>> => {
    try {
        const { title, sub_title, status, items } = req.body;
        const {service_id} = req.params;

        if(!service_id || !title || !sub_title || !status)
        {
            return res.status(400).json({ message: "All fields are required",success: false });
        }
        
        const serviceRepository = AppDataSource.getRepository(Services);
        const service = await serviceRepository.findOne({
            where: { service_id: service_id }
        });

        if(!service)
        {
            return res.status(404).json({ 
                message: "Service not found", 
                success: false 
            });
        }

        await serviceRepository.update(service_id, {
            title,
            sub_title,
            status
        });


        const itemsRepository = AppDataSource.getRepository(Items);
        const items_old = await itemsRepository.find({
            where: { service: { service_id: service_id } }
        });

        if(items_old)
        {
            for (const list_item of items_old) {
                await itemsRepository.remove(list_item);
            }
        }

        for (const list_item of items) {
            const item = new Items();
            item.type = list_item.type || "";
            item.price = list_item.price || 0;
            item.service = service;
            await AppDataSource.getRepository(Items).save(item);
        }
        
        return res.status(200).json({ 
            message: "Service updated successfully", 
            success: true 
        });
    } catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}

export default update_service;


