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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const products_1 = require("../entity/products");
let ProductController = class ProductController {
    getProduct(id) {
        return products_1.default.findOneById(id);
    }
    allProducts() {
        const products = products_1.default.find();
        return { products };
    }
    async updateProduct(id, update) {
        const product = await products_1.default.findOneById(id);
        if (!product)
            throw new routing_controllers_1.NotFoundError("Cannot find page");
        return products_1.default.merge(product, update).save();
    }
    createPage(product) {
        return product.save();
    }
};
__decorate([
    routing_controllers_1.Get("/products/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
__decorate([
    routing_controllers_1.Get("/products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "allProducts", null);
__decorate([
    routing_controllers_1.Put("/products/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    routing_controllers_1.Post("/products"),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_1.default]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createPage", null);
ProductController = __decorate([
    routing_controllers_1.JsonController()
], ProductController);
exports.default = ProductController;
//# sourceMappingURL=products.js.map