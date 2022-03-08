import { loginController } from "./../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const loginRouter = Router();

loginRouter.post(RoutePaths.main, loginController);

export default loginRouter;
