"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const CookieDecorator = (0, common_1.createParamDecorator)((key, context) => {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const value = request.cookies[key];
    return value || null;
});
exports.default = CookieDecorator;
//# sourceMappingURL=cookie.decorator.js.map