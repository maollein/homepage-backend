"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPositiveNumber = exports.isObjectContainingLoginField = exports.isLoginToken = exports.isNumber = exports.isString = void 0;
exports.isString = (object) => {
    return (typeof object === 'string' || object instanceof String);
};
exports.isNumber = (object) => {
    return (typeof object === 'number' || object instanceof Number);
};
exports.isLoginToken = (object) => {
    return (exports.isString(object.username) && exports.isString(object.name) && exports.isNumber(object.id));
};
exports.isObjectContainingLoginField = (object) => {
    return Boolean(object && object.login);
};
exports.isPositiveNumber = (object) => {
    return (object > 0);
};
