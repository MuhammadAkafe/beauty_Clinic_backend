import { Router, RequestHandler } from "express";
import login from "../controller/Auth/login";
import register from "../controller/Auth/register";


const router = Router();

router.post("/Login", login as unknown as RequestHandler);

router.post("/Register", register as unknown as RequestHandler);


export default router;
