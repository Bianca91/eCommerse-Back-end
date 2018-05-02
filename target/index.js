"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const products_1 = require("./controller/products");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [products_1.default]
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map