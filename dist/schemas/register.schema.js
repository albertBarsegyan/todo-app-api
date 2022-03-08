"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDataSchema = void 0;
const yup_1 = require("yup");
exports.registerDataSchema = (0, yup_1.object)({
    firstName: (0, yup_1.string)().required(),
    lastName: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required().min(8),
});
