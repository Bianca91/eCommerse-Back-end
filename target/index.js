"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const products_1 = require("./controller/products");
const db_1 = require("./db");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [products_1.default]
});
db_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map