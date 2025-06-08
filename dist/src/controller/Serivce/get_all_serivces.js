"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source/data-source");
const Service_1 = require("../../entity/Service");
const Users_1 = require("../../entity/Users");
const get_all_services = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }
        const userRepository = await data_source_1.AppDataSource.getRepository(Users_1.Users).findOne({
            where: { user_id: parseInt(user_id) }
        });
        if (!userRepository) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        const services = await data_source_1.AppDataSource.getRepository(Service_1.Services)
            .find({
            relations: ['items'],
            where: { user_id: parseInt(user_id) }
        });
        if (!services?.length) {
            return res.status(404).json({
                message: "No services found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Services fetched successfully",
            success: true,
            services
        });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
exports.default = get_all_services;
