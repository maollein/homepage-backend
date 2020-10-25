"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const blog_1 = __importDefault(require("./controllers/blog"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static(config_1.default.UI_BUILD_PATH));
if (process.env.NODE_ENV === 'development') {
    app.use(cors_1.default());
}
app.use('/api/blog', blog_1.default);
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(config_1.default.UI_BUILD_PATH, '/index.html'));
});
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
