"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHttpToHttps = exports.defaultEndpoint = exports.checkLogin = void 0;
const typeguards_1 = require("../utils/typeguards");
exports.checkLogin = (req, res, next) => {
    if (!typeguards_1.isNumber(req.userId) || isNaN(req.userId))
        return res.status(403).json({ error: 'Forbidden' });
    else
        return next();
};
exports.defaultEndpoint = (_req, res) => {
    return res.status(404).json({ error: 'No such endpoint' });
};
exports.redirectHttpToHttps = (req, res, next) => {
    if (req.header('x-forwarded-proto') === 'http') {
        return res.redirect(301, `https://${req.hostname}${req.url}`);
    }
    return next();
};
