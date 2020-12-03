"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedError = exports.loginError = exports.validationError = void 0;
exports.validationError = () => {
    return new Error('Invalid value');
};
exports.loginError = () => {
    return new Error('Invalid username or password');
};
exports.unauthorizedError = () => {
    return new Error('Unauthorized');
};
