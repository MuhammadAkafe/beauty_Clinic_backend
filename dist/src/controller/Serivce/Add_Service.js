"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add_Service = void 0;
const Service_1 = require("../../entity/Service");
const data_source_1 = require("../../data-source/data-source");
const Items_1 = require("./../../entity/Items");
const Users_1 = require("../../entity/Users");
const Add_Service = async (req, res) => {
    try {
        const { title, sub_title, status, items } = req.body;
        const { user_id } = req.params;
        // Input validation
        if (!user_id || !title || !sub_title || !items) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
                required: {
                    user_id: !user_id,
                    title: !title,
                    sub_title: !sub_title,
                    items: !items
                }
            });
        }
        // Find user
        const user = await data_source_1.AppDataSource.getRepository(Users_1.Users).findOne({
            where: { user_id: Number(user_id) }
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        // Create and save service
        const service = new Service_1.Services();
        service.title = title;
        service.sub_title = sub_title;
        service.status = status || "جلسه"; // Default status if not provided
        service.user_id = Number(user_id);
        const savedService = await data_source_1.AppDataSource.getRepository(Service_1.Services).save(service);
        if (!savedService) {
            return res.status(400).json({
                message: "Failed to save service",
                success: false
            });
        }
        for (const list_item of items) {
            const item = new Items_1.Items();
            item.type = list_item.type || "";
            item.price = list_item.price || 0;
            item.service = savedService;
            await data_source_1.AppDataSource.getRepository(Items_1.Items).save(item);
        }
        return res.status(201).json({
            message: "Service and item added successfully",
            success: true,
            service: savedService,
        });
    }
    catch (error) {
        console.error("Service creation error:", error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
};
exports.Add_Service = Add_Service;
