"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_schema_1 = require("./../schemas/register.schema");
const validator_middleware_1 = require("./../middlewares/validator.middleware");
const authController_1 = require("../controllers/authController");
const route_constants_1 = require("../constants/route.constants");
const express_1 = require("express");
const registerRouter = (0, express_1.Router)();
registerRouter.post(route_constants_1.RoutePaths.main, (0, validator_middleware_1.validate)(register_schema_1.registerDataSchema), authController_1.registrationController);
exports.default = registerRouter;