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
const http_terminator_1 = require("http-terminator");
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./db/db"));
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
const httpTerminator = http_terminator_1.createHttpTerminator({
    server
});
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    yield httpTerminator.terminate();
    yield db_1.default.closeDB();
    console.log('Clean shutdown');
    process.exit();
});
// on local windows
process.on('SIGINT', () => {
    void shutdown();
});
process.on('SIGTERM', () => {
    void shutdown();
});
