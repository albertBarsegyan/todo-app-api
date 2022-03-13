import { IResponse } from "./../../src/interfaces/response.interfaces";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    user: IResponse;
  }
}
