"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const typeorm_1 = require("typeorm");
const Service_1 = require("./Service");
let Items = class Items {
};
exports.Items = Items;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], Items.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Service_1.Services, (service) => service.items, {
        onDelete: "CASCADE",
        orphanedRowAction: "delete"
    }),
    (0, typeorm_1.JoinColumn)({ name: "service_id" }),
    __metadata("design:type", Service_1.Services)
], Items.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Items.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Items.prototype, "price", void 0);
exports.Items = Items = __decorate([
    (0, typeorm_1.Entity)("items")
], Items);
