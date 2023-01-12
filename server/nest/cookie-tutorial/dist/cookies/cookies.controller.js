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
exports.CookiesController = void 0;
const common_1 = require("@nestjs/common");
const cookie_decorator_1 = require("../common/decorators/cookie.decorator");
const COOKIE_NAME = 'nestjs';
let CookiesController = class CookiesController {
    getAll(request) {
        const cookies = request.cookies;
        console.log(cookies);
        return { cookies };
    }
    getSpecific(value) {
        return { value };
    }
    create(response) {
        response.cookie(COOKIE_NAME, 'backend', {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
        });
        response.status(201).send({ message: 'Cookie was created' });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CookiesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/specific'),
    __param(0, (0, cookie_decorator_1.default)(COOKIE_NAME)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CookiesController.prototype, "getSpecific", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CookiesController.prototype, "create", null);
CookiesController = __decorate([
    (0, common_1.Controller)('cookies')
], CookiesController);
exports.CookiesController = CookiesController;
//# sourceMappingURL=cookies.controller.js.map