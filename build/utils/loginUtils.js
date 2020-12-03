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
exports.getLoginCookieOptions = exports.getJWT = exports.compareAndFail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("./utils");
exports.compareAndFail = () => __awaiter(void 0, void 0, void 0, function* () {
    yield bcrypt_1.default.compare('wasteMyTime', config_1.default.FAKE_PASSWORD_HASH);
    throw utils_1.loginError();
});
exports.getJWT = (user) => {
    const userForToken = {
        username: user.username,
        name: user.name,
        id: user.id
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.JWT_SECRET, { expiresIn: '2d' });
    return token;
};
exports.getLoginCookieOptions = () => {
    const cookieOptions = {
        httpOnly: true,
        signed: true,
    };
    if (process.env.NODE_ENV !== 'development') {
        cookieOptions.sameSite = 'strict';
        cookieOptions.secure = true;
    }
    return cookieOptions;
};
