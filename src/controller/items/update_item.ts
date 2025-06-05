import { AppDataSource } from "../../data-source/data-source";
import { Items } from "../../entity/Items";
import { Request, Response } from "express";

export const update_item = async (req: Request, res: Response) => {
    try {
        const { type, price } = req.body;
        const {item_id} = req.params;
        if(!item_id )
        {
            return res.status(400).json({ message: "All fields are required",success: false });
        }
    const item = await AppDataSource.getRepository(Items).findOne({
        where: { item_id: parseInt(item_id) }
    });

    if(!item)
    {
        return res.status(400).json({ message: "Item not found",success: false });
    }
    item.type = type;
    item.price = price;
    await AppDataSource.getRepository(Items).save(item);
    return res.status(200).json({ message: "Item updated successfully",success: true });
    }
    catch(error)
    {
        return res.status(500).json({ message: `Internal server error ${error}`,success: false });
    }
    
}