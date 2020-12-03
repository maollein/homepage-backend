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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const parsers_1 = require("../utils/parsers");
const utils_1 = require("../utils/utils");
const loginUtils_1 = require("../utils/loginUtils");
const userService_1 = __importDefault(require("../services/userService"));
const loginRouter = express_1.Router();
loginRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = parsers_1.parseLoginInfo(req.body);
    const user = yield userService_1.default.getUserWithLoginCounter(loginInfo.username);
    // To mitigate username enumeration based on timing, 
    // we always compare passwords as if user account exists
    // and is not locked.
    if (!user || user.locked_until && new Date() < new Date(user.locked_until))
        return yield loginUtils_1.compareAndFail();
    // To mitigate brute force password guessing,
    // lock account after 10 failed login attempts.
    const passwordMatch = yield bcrypt_1.default.compare(loginInfo.password, user.password);
    if (!passwordMatch) {
        if (user.login_count < 10)
            yield userService_1.default.updateLoginCounter('increment', user.id);
        else
            yield userService_1.default.updateLoginCounter('lock', user.id);
        throw utils_1.loginError();
    }
    else {
        yield userService_1.default.updateLoginCounter('reset', user.id);
    }
    const token = loginUtils_1.getJWT(user);
    const cookieOptions = loginUtils_1.getLoginCookieOptions();
    res.cookie('login', token, cookieOptions);
    return res.json({ username: user.username, name: user.name, id: user.id });
}));
loginRouter.post('/logout', (_req, res) => {
    res.cookie('login', '', { maxAge: 0 });
    res.json({ response: 'Logged out' });
});
exports.default = loginRouter;
