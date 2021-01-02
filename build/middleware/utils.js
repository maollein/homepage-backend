"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHttpToHttps = exports.defaultEndpoint = exports.checkLogin = void 0;
const typeguards_1 = require("../utils/typeguards");
const checkLogin = (req, res, next) => {
    if (!typeguards_1.isNumber(req.userId) || isNaN(req.userId))
        return res.status(403).json({ error: 'Forbidden' });
    else
        return next();
};
exports.checkLogin = checkLogin;
const defaultEndpoint = (_req, res) => {
    return res.status(404).json({ error: 'No such endpoint' });
};
exports.defaultEndpoint = defaultEndpoint;
const redirectHttpToHttps = (req, res, next) => {
    if (req.header('x-forwarded-proto') === 'http') {
        return res.redirect(301, `https://${req.hostname}${req.url}`);
    }
    return next();
};
exports.redirectHttpToHttps = redirectHttpToHttps;
