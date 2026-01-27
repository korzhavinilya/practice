"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bench_1 = require("./bench");
const workerpool = require('workerpool');
const PORT = 3000;
const app = (0, express_1.default)();
const filePath = __dirname + '/workerpool-worker.js';
const pool = workerpool.pool(filePath);
app.use(express_1.default.json());
app.get('/single', (req, res, next) => {
    const result = (0, bench_1.CPU)(500);
    res.end(JSON.stringify({ result: result.length }));
});
app.get('/workerpool', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.exec('CPU', [500]);
    res.end(JSON.stringify({ result: result.length }));
}));
app.listen(PORT, () => {
    console.log(`App is listening on`, PORT, `http://localhost:${PORT}`);
});
