"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const blog_1 = __importDefault(require("./controllers/blog"));
const login_1 = __importDefault(require("./controllers/login"));
const errorHandler_1 = require("./middleware/errorHandler");
const loginTokenParser_1 = __importDefault(require("./middleware/loginTokenParser"));
const utils_1 = require("./middleware/utils");
const csurf_1 = __importDefault(require("csurf"));
const cspReporting_1 = __importDefault(require("./controllers/cspReporting"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const app = express_1.default();
app.disable("x-powered-by");
app.use(helmet_1.default({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            imgSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrcAttr: ["'none'"],
            blockAllMixedContent: [],
            upgradeInsecureRequests: []
        }
    },
    hidePoweredBy: false
}));
app.use(utils_1.redirectHttpToHttps);
app.use(cookie_parser_1.default(config_1.default.COOKIE_SECRET));
app.use(express_1.default.json());
const csurfCookieOptions = {
    signed: true,
    httpOnly: true
};
const csrfTokenOptions = {};
if (process.env.NODE_ENV !== 'development') {
    csurfCookieOptions.secure = true;
    csurfCookieOptions.sameSite = 'strict';
    csrfTokenOptions.secure = true;
    csrfTokenOptions.sameSite = 'strict';
}
app.use(csurf_1.default({ cookie: csurfCookieOptions }));
app.use(loginTokenParser_1.default);
app.use(compression_1.default({
    threshold: '5kb'
}));
app.use('/api/blog', blog_1.default);
app.use('/api', login_1.default);
app.use('/api/cspreport', cspReporting_1.default);
app.use(express_1.default.static(config_1.default.UI_BUILD_PATH, { index: false }));
app.get('*', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken(), csrfTokenOptions);
    res.sendFile(path_1.default.join(config_1.default.UI_BUILD_PATH, '/index.html'));
});
app.use(errorHandler_1.errorHandler);
app.use(utils_1.defaultEndpoint);
exports.default = app;
