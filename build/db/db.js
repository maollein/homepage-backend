"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const poolConfig = {
    connectionString: config_1.default.DATABASE_URL,
};
if (process.env.NODE_ENV !== 'development')
    poolConfig.ssl = { rejectUnauthorized: false };
// Overriding pg default date parsing so that no
// time zone conversions are made to our
// precious UTC timestamps.
pg_1.types.setTypeParser(1114, stringValue => {
    return new Date(Date.parse(stringValue + "+0000"));
});
const pool = new pg_1.Pool(poolConfig);
const closeDB = () => {
    return pool.end();
};
exports.default = {
    query: (text, params) => {
        return pool.query(text, params);
    },
    pool,
    closeDB
};
