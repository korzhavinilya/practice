"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooModule = void 0;
const common_1 = require("@nestjs/common");
const bar_module_1 = require("../bar/bar.module");
const baz_module_1 = require("../baz/baz.module");
const foo_controller_1 = require("./foo.controller");
const foo_service_1 = require("./foo.service");
let FooModule = class FooModule {
};
FooModule = __decorate([
    (0, common_1.Module)({
        controllers: [foo_controller_1.FooController],
        providers: [foo_service_1.FooService],
        imports: [bar_module_1.BarModule, baz_module_1.BazModule],
    })
], FooModule);
exports.FooModule = FooModule;
//# sourceMappingURL=foo.module.js.map