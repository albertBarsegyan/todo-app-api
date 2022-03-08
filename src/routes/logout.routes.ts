import { logoutController } from "./../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const logoutRouter = Router();

logoutRouter.delete(RoutePaths.main, logoutController);

export default logoutRouter;
