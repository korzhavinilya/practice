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
require("./");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
let mdl = {
    getName() {
        return 'default';
    }
};
app.get('/', (req, res, next) => {
    res.send('Module: ' + mdl.getName());
});
app.post('/:moduleName', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mdl = yield import('./' + req.params.moduleName);
        res.send('Module is loaded');
    }
    catch (error) {
        console.log('error', error);
        res.status(400).send('Something went wrong...');
    }
}));
app.listen(PORT, () => {
    console.log(`App is listening on`, PORT, `http://localhost:PORT`);
});
//# sourceMappingURL=index.js.map