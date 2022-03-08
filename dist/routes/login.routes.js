"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./../controllers/authController");
const route_constants_1 = require("../constants/route.constants");
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
loginRouter.post(route_constants_1.RoutePaths.main, authController_1.loginController);
exports.default = loginRouter;
