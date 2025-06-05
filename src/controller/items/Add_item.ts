import { Request, Response } from "express";
import { AppDataSource } from "../../data-source/data-source";
import { Items } from "../../entity/Items";
import { Services } from "../../entity/Service";

export const add_item = async (req: Request, res: Response) => {

    try {
        const {service_id, type, price } = req.body;
        if(  !service_id || !type || !price )
        {
            return res.status(400).json({ message: "All fields are required",success: false });
        }

    const item = new Items();

    const service = await AppDataSource.getRepository(Services).findOne({
        where: { service_id: parseInt(service_id) }
            });
    if(!service)
    {
        return res.status(400).json({ message: "Service not found",success: false });
    }

    item.service = service;
    item.type = type;
    item.price = price; 

    await AppDataSource.getRepository(Items).save(item);

    return res.status(200).json({ message: "Item added successfully",success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error",success: false });
    }



}