import { loginController } from "./../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const homeRouter = Router();

homeRouter.post(RoutePaths.main, loginController);

export default homeRouter;
