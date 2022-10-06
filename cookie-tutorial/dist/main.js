"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const cookies_service_1 = require("./cookies/cookies.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors();
    await app.listen(3000);
    const cookiesService = app.get(cookies_service_1.CookiesService);
    cookiesService.greeting();
}
bootstrap();
//# sourceMappingURL=main.js.map