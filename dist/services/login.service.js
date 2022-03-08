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
exports.loginUser = void 0;
const hashPassword_1 = require("./../helpers/hashPassword");
const prismaClient_1 = require("../configs/prismaClient");
const messages_constants_1 = require("../constants/messages.constants");
const removeKeysFromObject_1 = __importDefault(require("../helpers/removeKeysFromObject"));
const loginUser = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithCurrentEmail = yield prismaClient_1.prisma.users.findFirst({
        where: { email },
    });
    if (userWithCurrentEmail) {
        const isPasswordsMatch = yield (0, hashPassword_1.comparePassword)(password, userWithCurrentEmail.password);
        if (isPasswordsMatch) {
            const userData = (0, removeKeysFromObject_1.default)(userWithCurrentEmail, [
                "password",
            ]);
            return {
                status: "success",
                data: userData,
                message: messages_constants_1.ResponseMessages.successLogin,
            };
        }
        return {
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.passwordIncorrect,
        };
    }
    return { status: "error", data: null, message: messages_constants_1.ResponseMessages.invalidData };
});
exports.loginUser = loginUser;
