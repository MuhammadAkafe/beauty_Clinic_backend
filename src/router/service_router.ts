import { Router } from "express";
import { Add_Service } from "../controller/Serivce/Add_Service";
import delete_service from "../controller/Serivce/delete_service";
import { RequestHandler } from "express";
import update_service from "../controller/Serivce/update_Service";
import get_all_serivces from "../controller/Serivce/get_all_serivces";
import verify_token from "../controller/Auth/Token";
import { delete_all_services } from "../controller/Serivce/delete_all_services";
const serviceRouter = Router();

//serviceRouter.use(verify_token as unknown as RequestHandler);
serviceRouter.post("/Add_Service/:user_id", Add_Service as unknown as RequestHandler);
serviceRouter.delete("/delete_service/:service_id", delete_service as unknown as RequestHandler);
serviceRouter.put("/update_service/:service_id", update_service as unknown as RequestHandler);
serviceRouter.get("/get_all_services/:user_id", get_all_serivces as unknown as RequestHandler);
serviceRouter.delete("/delete_all_services/:user_id", delete_all_services as unknown as RequestHandler);
export default serviceRouter;


