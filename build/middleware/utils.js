"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cspHeaderInjector = exports.cspReportOnlyHeaderInjector = exports.defaultEndpoint = exports.checkLogin = void 0;
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
exports.cspReportOnlyHeaderInjector = (_req, res, next) => {
    res.setHeader("Content-Security-Policy-Report-Only", "default-src 'self'; report-uri /api/cspreport");
    return next();
};
exports.cspHeaderInjector = (_req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';");
    return next();
};
