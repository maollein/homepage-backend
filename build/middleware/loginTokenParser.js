"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const typeguards_1 = require("../utils/typeguards");
const parsers_1 = require("../utils/parsers");
const loginTokenParser = (req, _res, next) => {
    const loginCookie = parsers_1.parseLoginCookie(req.signedCookies);
    if (loginCookie) {
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(loginCookie, config_1.default.JWT_SECRET);
        }
        catch (e) {
            req.userId = null;
            return next();
        }
        if (typeguards_1.isLoginToken(decodedToken)) {
            req.userId = decodedToken.id;
        }
        else {
            req.userId = null;
        }
    }
    else {
        req.userId = null;
    }
    return next();
};
exports.default = loginTokenParser;
