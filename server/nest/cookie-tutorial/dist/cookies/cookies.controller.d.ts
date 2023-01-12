import { Request, Response } from 'express';
export declare class CookiesController {
    getAll(request: Request): {
        cookies: any;
    };
    getSpecific(value: string): {
        value: string;
    };
    create(response: Response): void;
}
