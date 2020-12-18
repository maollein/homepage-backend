"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./db/db"));
const app_1 = __importDefault(require("./app"));
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
process.on('SIGINT', () => {
    db_1.default.closeDB();
    console.log('We caught a sigint');
});
process.on('SIGTERM', () => {
    db_1.default.closeDB();
    console.log('We caught a sigterm');
});
