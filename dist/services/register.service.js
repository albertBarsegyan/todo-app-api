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
exports.registerUser = void 0;
const path_constants_1 = require("./../constants/path.constants");
const saveImageToStore_service_1 = require("./saveImageToStore.service");
const hashPassword_helpers_1 = require("../helpers/hashPassword.helpers");
const prismaClient_1 = require("../configs/prismaClient");
const messages_constants_1 = require("../constants/messages.constants");
const removeKeysFromObject_helpers_1 = __importDefault(require("../helpers/removeKeysFromObject.helpers"));
const lodash_1 = require("lodash");
const registerUser = ({ firstName, lastName, email, password, profilePicture, }) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield prismaClient_1.prisma.users.findFirst({
        where: { email },
    });
    if (currentUser) {
        return {
            status: "error",
            data: null,
            message: messages_constants_1.ResponseMessages.emailExist,
        };
    }
    try {
        const imageResponse = yield (0, saveImageToStore_service_1.saveImageToStore)(profilePicture);
        if (imageResponse.status === "error") {
            return imageResponse;
        }
        const newUser = yield prismaClient_1.prisma.users.create({
            data: {
                first_name: (0, lodash_1.upperFirst)(firstName),
                last_name: (0, lodash_1.upperFirst)(lastName),
                email,
                password: (0, hashPassword_helpers_1.hashPassword)(password),
                profile_picture: path_constants_1.Paths.baseUrl("images", imageResponse.data),
            },
        });
        const newUserData = (0, removeKeysFromObject_helpers_1.default)(newUser, ["password"]);
        return {
            status: "success",
            message: messages_constants_1.ResponseMessages.successMessage,
            data: newUserData,
        };
    }
    catch (error) {
        return { status: "error", message: error.message, data: null };
    }
});
exports.registerUser = registerUser;
