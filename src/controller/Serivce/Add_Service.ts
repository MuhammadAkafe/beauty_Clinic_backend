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
        const { title, sub_title, status, items} = req.body;
        const { user_id } = req.params;


        // Input validation
        if (!user_id || !title || !sub_title || !items ) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
                required: {
                    user_id: !user_id,
                    title: !title,
                    sub_title: !sub_title,
                    items: !items
                }
            });
        }



        // Find user
        const user = await AppDataSource.getRepository(Users).findOne({
            where: { user_id: Number(user_id) }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Create and save service
        const service = new Services();
        service.title = title;
        service.sub_title = sub_title;
        service.status = status || "جلسه"; // Default status if not provided
        service.user_id = Number(user_id);

        const savedService = await AppDataSource.getRepository(Services).save(service);

        if (!savedService) {
           return res.status(400).json({
            message: "Failed to save service",
            success: false
           });
        }
        for (const list_item of items) {
            const item = new Items();
            item.type = list_item.type || "";
            item.price = list_item.price || 0;
            item.service = savedService;
            await AppDataSource.getRepository(Items).save(item);
        }

        return res.status(201).json({ 
            message: "Service and item added successfully", 
            success: true, 
            service: savedService,
        });
    } catch (error: any) {
        console.error("Service creation error:", error);
        return res.status(500).json({ 
            message: error.message || "Internal server error", 
            success: false
        });
    }
}
