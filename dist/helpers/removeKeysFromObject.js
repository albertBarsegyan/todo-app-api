"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludeKeysFromObject(object, keys) {
    return Object.entries(object).reduce((acc, [key, value]) => {
        if (!keys.includes(key)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
exports.default = excludeKeysFromObject;
