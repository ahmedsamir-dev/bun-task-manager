import { Elysia } from "elysia";

export default interface IController {
  routes(app: Elysia): any;
}
