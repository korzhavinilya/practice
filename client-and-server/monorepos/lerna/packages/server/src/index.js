"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res, next) => {
    const user = {
        name: 'Ilya',
        age: 26,
        friends: [
            {
                name: 'Sveta',
                age: 27,
                friends: []
            }
        ]
    };
    res.send(200);
});
app.listen(PORT, () => {
    console.log(`App is listening on`, PORT, `http://localhost:PORT`);
});
//# sourceMappingURL=index.js.map