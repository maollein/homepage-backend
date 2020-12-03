"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool();
const closeDB = () => {
    pool.end(() => {
        console.log('Pool ended');
        process.exit();
    });
};
exports.default = {
    query: (text, params) => {
        return pool.query(text, params);
    },
    closeDB
};
