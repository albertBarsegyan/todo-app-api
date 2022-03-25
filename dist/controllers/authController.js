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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = exports.registrationController = void 0;
const todo_service_1 = require("./../services/todo.service");
const login_service_1 = require("./../services/login.service");
const messages_constants_1 = require("../constants/messages.constants");
const register_service_1 = require("../services/register.service");
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRegisterData = req.body;
    if ((0, lodash_1.isEmpty)(userRegisterData)) {
        return res.json({
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.invalidData,
        });
    }
    const resData = yield (0, register_service_1.registerUser)(userRegisterData);
    return res.json(resData);
});
exports.registrationController = registrationController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoginData = req.body;
    if ((0, lodash_1.isEmpty)(userLoginData) || !userLoginData) {
        return res.json({
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.invalidData,
        });
    }
    const loginResponse = yield (0, login_service_1.userLogin)(userLoginData);
    const isLoginSuccess = loginResponse.status === "success";
    if (isLoginSuccess) {
        const loggedUserData = loginResponse.data;
        const userTodos = yield (0, todo_service_1.getTodoByUserIdFromDb)(loggedUserData.id);
        const accessToken = jsonwebtoken_1.default.sign(loggedUserData.id, process.env.JWT_TOKEN_SECRET || "secret");
        const responseData = Object.assign(Object.assign({}, loggedUserData), { todos: userTodos });
        req.session.userId = loggedUserData.id;
        return res.json({
            message: loginResponse.message,
            status: loginResponse.status,
            data: responseData,
            accessToken,
        });
    }
    return res.json(loginResponse);
});
exports.loginController = loginController;
const logoutController = (req, res) => {
    return req.session.destroy((err) => {
        if (err) {
            return res.json({
                data: null,
                status: "error",
                message: err.message,
            });
        }
        return res.json({
            data: null,
            status: "success",
            message: messages_constants_1.ResponseMessages.successLogout,
        });
    });
};
exports.logoutController = logoutController;
