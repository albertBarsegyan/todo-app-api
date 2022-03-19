import { JwtPayload } from "jsonwebtoken";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    user: any;
    userToken: string | JwtPayload;
  }
}
