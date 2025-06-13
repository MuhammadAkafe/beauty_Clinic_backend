"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source/data-source"));
const Service_1 = require("../../entity/Service");
const Items_1 = require("../../entity/Items");
const update_service = async (req, res) => {
    try {
        const { title, sub_title, status, items } = req.body;
        const { service_id } = req.params;
        if (!service_id || !title || !sub_title || !status) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const serviceRepository = data_source_1.default.getRepository(Service_1.Services);
        const service = await serviceRepository.findOne({
            where: { service_id: service_id }
        });
        if (!service) {
            return res.status(404).json({
                message: "Service not found",
                success: false
            });
        }
        await serviceRepository.update(service_id, {
            title,
            sub_title,
            status
        });
        const itemsRepository = data_source_1.default.getRepository(Items_1.Items);
        const items_old = await itemsRepository.find({
            where: { service: { service_id: service_id } }
        });
        if (items_old) {
            for (const list_item of items_old) {
                await itemsRepository.remove(list_item);
            }
        }
        for (const list_item of items) {
            const item = new Items_1.Items();
            item.type = list_item.type || "";
            item.price = list_item.price || 0;
            item.service = service;
            await data_source_1.default.getRepository(Items_1.Items).save(item);
        }
        return res.status(200).json({
            message: "Service updated successfully",
            success: true
        });
    }
    catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
exports.default = update_service;
