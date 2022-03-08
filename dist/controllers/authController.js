"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registrationController = void 0;
const login_service_1 = require("./../services/login.service");
const messages_constants_1 = require("../constants/messages.constants");
const register_service_1 = require("../services/register.service");
const lodash_1 = require("lodash");
const registrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRegisterData = req.body;
    if ((0, lodash_1.isEmpty)(userRegisterData)) {
        return res.send({
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.invalidData,
        });
    }
    const resData = yield (0, register_service_1.registerUser)(userRegisterData);
    if (resData.status === "success") {
        req.session.userId = resData.data.id;
    }
    return res.json(resData);
});
exports.registrationController = registrationController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoginData = req.body;
    if ((0, lodash_1.isEmpty)(userLoginData)) {
        return res.send({
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.invalidData,
        });
    }
    const resData = yield (0, login_service_1.loginUser)(userLoginData);
    if (resData.status === "success") {
        req.session.userId = resData.data.id;
    }
    return res.json(resData);
});
exports.loginController = loginController;
