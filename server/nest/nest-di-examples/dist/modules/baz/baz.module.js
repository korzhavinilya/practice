"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BazModule = void 0;
const common_1 = require("@nestjs/common");
const abstract_baz_service_1 = require("./abstract-baz.service");
const baz_service_1 = require("./baz.service");
let BazModule = class BazModule {
};
BazModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: abstract_baz_service_1.AbstractBazService,
                useClass: baz_service_1.BazService,
            },
        ],
        exports: [abstract_baz_service_1.AbstractBazService],
    })
], BazModule);
exports.BazModule = BazModule;
//# sourceMappingURL=baz.module.js.map