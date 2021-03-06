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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const user_1 = require("./user");
let UserController = class UserController {
    async setPassword(user) {
        const { password } = user, rest = __rest(user, ["password"]);
        const entity = user_1.default.create(rest);
        await entity.setPassword(password);
        return entity.save();
    }
    getUser(id) {
        return user_1.default.findOneById(id);
    }
    allUsers() {
        return user_1.default.find();
    }
    async updateUser(id, update) {
        const user = await user_1.default.findOneById(id);
        if (!user)
            throw new routing_controllers_1.NotFoundError('Cannot find user');
        return user_1.default.merge(user, update).save();
    }
    async removeUser(id) {
        const user = await user_1.default.findOneById(id);
        if (!user)
            throw new routing_controllers_1.NotFoundError('Cannot find user');
        user.remove();
        return "user succesfully deleted";
    }
};
__decorate([
    routing_controllers_1.Post('/users'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPassword", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/users/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "allUsers", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put('/users/:id([0-9]+)'),
    routing_controllers_1.Patch('/users/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/users/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeUser", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.default = UserController;
//# sourceMappingURL=userController.js.map