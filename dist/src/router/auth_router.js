"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controller/Auth/login"));
const register_1 = __importDefault(require("../controller/Auth/register"));
const router = (0, express_1.Router)();
router.post("/Login", login_1.default);
router.post("/Register", register_1.default);
exports.default = router;
