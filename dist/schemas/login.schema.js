"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDataSchema = void 0;
const yup_1 = require("yup");
exports.loginDataSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required().min(8),
});
