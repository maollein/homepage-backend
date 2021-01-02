"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedError = exports.loginError = exports.validationError = void 0;
const validationError = () => {
    return new Error('Invalid value');
};
exports.validationError = validationError;
const loginError = () => {
    return new Error('Invalid username or password');
};
exports.loginError = loginError;
const unauthorizedError = () => {
    return new Error('Unauthorized');
};
exports.unauthorizedError = unauthorizedError;
