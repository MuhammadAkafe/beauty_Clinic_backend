"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_all_services = void 0;
const data_source_1 = require("../../data-source/data-source");
const Service_1 = require("../../entity/Service");
const Users_1 = require("../../entity/Users");
const delete_all_services = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }
        const userRepository = await data_source_1.AppDataSource.getRepository(Users_1.Users).findOne({
            where: { user_id: user_id }
        });
        if (!userRepository) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        await data_source_1.AppDataSource.createQueryBuilder().delete().from(Service_1.Services).where(" user_id = :user_id", { user_id }).execute();
        return res.status(200).json({ message: "Services deleted successfully", success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
exports.delete_all_services = delete_all_services;
