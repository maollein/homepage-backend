"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPositiveNumber = exports.isObjectContainingLoginField = exports.isLoginToken = exports.isNumber = exports.isString = void 0;
const isString = (object) => {
    return (typeof object === 'string' || object instanceof String);
};
exports.isString = isString;
const isNumber = (object) => {
    return (typeof object === 'number' || object instanceof Number);
};
exports.isNumber = isNumber;
const isLoginToken = (object) => {
    return (exports.isString(object.username) && exports.isString(object.name) && exports.isNumber(object.id));
};
exports.isLoginToken = isLoginToken;
const isObjectContainingLoginField = (object) => {
    return Boolean(object && object.login);
};
exports.isObjectContainingLoginField = isObjectContainingLoginField;
const isPositiveNumber = (object) => {
    return (object > 0);
};
exports.isPositiveNumber = isPositiveNumber;
