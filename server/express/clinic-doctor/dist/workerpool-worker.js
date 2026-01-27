"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bench_1 = require("./bench");
const workerpool_1 = __importDefault(require("workerpool"));
workerpool_1.default.worker({
    CPU: bench_1.CPU
});
