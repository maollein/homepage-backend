"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = exports.parseString = exports.parseLoginCookie = exports.parseNewBlog = exports.parseLoginInfo = void 0;
const typeguards_1 = require("./typeguards");
const utils_1 = require("./utils");
const parseLoginInfo = (object) => {
    return {
        username: exports.parseString(object.username),
        password: exports.parseString(object.password)
    };
};
exports.parseLoginInfo = parseLoginInfo;
const parseNewBlog = (object) => {
    return {
        title: exports.parseString(object.title),
        content: exports.parseString(object.content)
    };
};
exports.parseNewBlog = parseNewBlog;
const parseLoginCookie = (object) => {
    if (typeguards_1.isObjectContainingLoginField(object) && typeguards_1.isString(object.login)) {
        return object.login;
    }
    else
        return null;
};
exports.parseLoginCookie = parseLoginCookie;
const parseString = (object) => {
    if (object && typeguards_1.isString(object))
        return object;
    else
        throw utils_1.validationError();
};
exports.parseString = parseString;
const parseNumber = (object) => {
    if (object && typeguards_1.isNumber(object))
        return object;
    else
        throw utils_1.validationError();
};
exports.parseNumber = parseNumber;
