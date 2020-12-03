"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cspReportingRouter = express_1.Router();
cspReportingRouter.post('/', (req, res) => {
    console.log(req);
    res.status(200).end();
});
exports.default = cspReportingRouter;
