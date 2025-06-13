import  AppDataSource  from "../../data-source/data-source";
    import { Services } from "../../entity/Service";
import { Request, Response } from "express";
import { PathParams } from "../../types/Request";
import { DeleteServiceResponse } from "../../types/Response";
import { Users } from "../../entity/Users";


export const delete_all_services = async (req: Request<PathParams>, res: Response): Promise<Response<DeleteServiceResponse>> => {

    try{

        const {user_id} = req.params;

        if(!user_id)
        {
            return res.status(400).json({ message: "User ID is required",success: false });
        }

        const userRepository = await AppDataSource.getRepository(Users).findOne({
            where: { user_id: user_id }
        });

        if(!userRepository)
        {
            return res.status(400).json({ message: "User not found",success: false });
        }

        await AppDataSource.createQueryBuilder().delete().from(Services).where(
            " user_id = :user_id", { user_id }).execute();

        return res.status(200).json({ message: "Services deleted successfully",success: true });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal server error",success: false });
    }
}