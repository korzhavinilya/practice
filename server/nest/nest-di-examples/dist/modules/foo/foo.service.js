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
exports.FooService = void 0;
const common_1 = require("@nestjs/common");
const abstract_baz_service_1 = require("../baz/abstract-baz.service");
let FooService = class FooService {
    constructor(barService, bazService) {
        this.barService = barService;
        this.bazService = bazService;
    }
    run() {
        console.log('barService', this.barService.run());
        console.log('bazService', this.bazService.run());
    }
};
FooService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BAR_SERVICE')),
    __metadata("design:paramtypes", [Object, abstract_baz_service_1.AbstractBazService])
], FooService);
exports.FooService = FooService;
//# sourceMappingURL=foo.service.js.map