import { CookiesService } from './cookies/cookies.service';
export declare class AppService {
    cookieService: CookiesService;
    constructor(cookieService: CookiesService);
    getHello(): string;
}
