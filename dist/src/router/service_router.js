"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Add_Service_1 = require("../controller/Serivce/Add_Service");
const delete_service_1 = __importDefault(require("../controller/Serivce/delete_service"));
const update_Service_1 = __importDefault(require("../controller/Serivce/update_Service"));
const get_all_serivces_1 = __importDefault(require("../controller/Serivce/get_all_serivces"));
const delete_all_services_1 = require("../controller/Serivce/delete_all_services");
const serviceRouter = (0, express_1.Router)();
//serviceRouter.use(verify_token as unknown as RequestHandler);
serviceRouter.post("/Add_Service/:user_id", Add_Service_1.Add_Service);
serviceRouter.delete("/delete_service/:service_id", delete_service_1.default);
serviceRouter.put("/update_service/:service_id", update_Service_1.default);
serviceRouter.get("/get_all_services/:user_id", get_all_serivces_1.default);
serviceRouter.delete("/delete_all_services/:user_id", delete_all_services_1.delete_all_services);
exports.default = serviceRouter;
