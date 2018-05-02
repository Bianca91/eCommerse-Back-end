import "reflect-metadata";
import { Action, BadRequestError, useKoaServer } from "routing-controllers";
import setupDb from "./db";
import { verify } from "./jwt";
import * as Koa from "koa";
import { Server } from "http";
import { secret } from "./jwt";
import LoginController from "./login/controller";
import UserController from "./login/userController";
import ProductController from "./controller/products"
import User from './login/user'

const app = new Koa();
const server = new Server(app.callback());

const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  controllers: [LoginController, ProductController, UserController],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      try {
        return !!(token && verify(token));
      } catch (e) {
        throw new BadRequestError(e);
      }
    }

    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      if (token) {
        const id = verify(token);
        return User.findOneById(id);
      }
    }
    return undefined;
  }
});
setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
