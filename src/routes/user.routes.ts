import { userController } from "./../controllers/userController";
import { registerDataSchema } from "./../schemas/register.schema";
import { validate } from "./../middlewares/validator.middleware";
import { DynamicRoutes, RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const userRouter = Router();

userRouter.get(DynamicRoutes.id(), userController);

export default userRouter;
