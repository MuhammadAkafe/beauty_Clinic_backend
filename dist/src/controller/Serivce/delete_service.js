"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source/data-source"));
const Service_1 = require("../../entity/Service");
const delete_service = async (req, res) => {
    try {
        const { service_id } = req.params;
        if (!service_id) {
            return res.status(400).json({
                message: "Service ID is required",
                success: false
            });
        }
        const serviceRepository = await data_source_1.default.getRepository(Service_1.Services).findOne({
            where: { service_id: service_id }
        });
        if (!serviceRepository) {
            return res.status(400).json({ message: "Service not found", success: false });
        }
        await data_source_1.default.createQueryBuilder().delete().from(Service_1.Services).where(" service_id = :service_id", { service_id }).execute();
        return res.status(200).json({
            message: "Service deleted successfully",
            success: true
        });
    }
    catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
exports.default = delete_service;
