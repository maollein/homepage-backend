"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
exports.isString = (object) => {
    return (typeof object === 'string' || object instanceof String);
};
exports.isNumber = (object) => {
    return (typeof object === 'number' || object instanceof Number);
};
