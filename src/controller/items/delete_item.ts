import { Request, Response } from "express";
import { AppDataSource } from "../../data-source/data-source";
import { Items } from "../../entity/Items";

export const delete_item = async (req: Request, res: Response) => {
    try {
        const { item_id } = req.params;
        const item = await AppDataSource.getRepository(Items).findOne({
            where: { item_id: parseInt(item_id) }
    });
    if(!item)
    {
        return res.status(400).json({ message: "Item not found",success: false });
    }
    await AppDataSource.getRepository(Items).remove(item);
    return res.status(200).json({ message: "Item deleted successfully",success: true });
    }
    catch(error)
    {
        return res.status(500).json({ message: `Internal server error ${error}`,success: false });
    }
    
}
