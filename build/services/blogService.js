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
const db_1 = __importDefault(require("../db/db"));
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM blog ORDER BY created_at DESC;", []);
    return result.rows;
});
const getPostCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT COUNT(*) FROM blog;", []);
    return result.rows[0];
});
/**
 * Returns a list of all the months
 * that a blogpost has been written in.
 * Format is YYYY-MM, order descending.
 */
const getMonthsWhenPostsWritten = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT DISTINCT to_char(created_at, 'YYYY-MM') AS MONTH FROM blog ORDER BY month DESC;", []);
    return result.rows.map(row => row.month);
});
/**
 *
 * @param month String in the format YYYY-MM
 */
const getPostsByMonth = (month) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM blog WHERE to_char(created_at, 'YYYY-MM')=$1 ORDER BY created_at DESC;", [month]);
    return result.rows;
});
const getPostsByPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 5;
    const offset = limit * (page - 1);
    const result = yield db_1.default.query("SELECT * FROM blog ORDER BY created_at DESC LIMIT 5 OFFSET $1;", [offset]);
    return result.rows;
});
const updatePost = (id, blog, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("UPDATE blog \
     SET title=$1, content=$2, modified_at=(NOW() AT TIME ZONE 'utc') \
     WHERE id=$3 AND user_id=$4 \
     RETURNING *;", [blog.title, blog.content, id, userId]); // userId is futureproofing. At this time homepage 
    // is supposed to have only one user
    if (result.rows.length < 1)
        throw new Error('Not found');
    return result.rows[0];
});
exports.default = {
    getPostCount,
    getMonthsWhenPostsWritten,
    getPostsByMonth,
    getPostsByPage,
    getAllPosts,
    updatePost
};
