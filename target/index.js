"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const jwt_1 = require("./jwt");
const Koa = require("koa");
const http_1 = require("http");
const controller_1 = require("./login/controller");
const userController_1 = require("./login/userController");
const products_1 = require("./controller/products");
const user_1 = require("./login/user");
const app = new Koa();
const server = new http_1.Server(app.callback());
const port = process.env.PORT || 4000;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [controller_1.default, products_1.default, userController_1.default],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith("Bearer ")) {
            const [, token] = header.split(" ");
            try {
                return !!(token && jwt_1.verify(token));
            }
            catch (e) {
                throw new routing_controllers_1.BadRequestError(e);
            }
        }
        return false;
    },
    currentUserChecker: async (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith("Bearer ")) {
            const [, token] = header.split(" ");
            if (token) {
                const id = jwt_1.verify(token);
                return user_1.default.findOneById(id);
            }
        }
        return undefined;
    }
});
db_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map