    import { AppDataSource } from "../../data-source/data-source";
    import { Services } from "../../entity/Service";
import { Request, Response } from "express";


export const delete_all_services = async (req: Request, res: Response) => {

    try{
        await AppDataSource.createQueryBuilder().delete().from(Services).execute();

        return res.status(200).json({ message: "Services deleted successfully",success: true });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal server error",success: false });
    }
}