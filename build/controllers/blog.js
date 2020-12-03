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
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const utils_1 = require("../middleware/utils");
const blogService_1 = __importDefault(require("../services/blogService"));
const parsers_1 = require("../utils/parsers");
const typeguards_1 = require("../utils/typeguards");
const blogRouter = express_1.Router();
// TODO move all db queries to blogService
blogRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts;
    if (typeguards_1.isString(req.query.month)) {
        posts = yield blogService_1.default.getPostsByMonth(req.query.month);
    }
    else if (typeguards_1.isPositiveNumber(Number(req.query.page))) {
        posts = yield blogService_1.default.getPostsByPage(Number(req.query.page));
    }
    else {
        posts = yield blogService_1.default.getPostsByPage(1);
    }
    if (posts.length < 1)
        return res.status(404).json({ error: 'Not found' });
    return res.json(posts);
}));
blogRouter.get('/months', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const months = yield blogService_1.default.getMonthsWhenPostsWritten();
    return res.json(months);
}));
blogRouter.get('/postcount', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield blogService_1.default.getPostCount();
    return res.json(count);
}));
blogRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield db_1.default.query('SELECT * FROM blog WHERE id=$1', [id]);
    if (result.rowCount !== 1)
        return res.status(404).json({ error: 'Not found' });
    else
        return res.json(result.rows[0]);
}));
blogRouter.post('/', utils_1.checkLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = parsers_1.parseNewBlog(req.body);
    const result = yield db_1.default.query('INSERT INTO blog (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;', [blog.title, blog.content, req.userId]);
    return res.status(200).json(result.rows[0]);
}));
blogRouter.put('/:id', utils_1.checkLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = parsers_1.parseNewBlog(req.body);
    if (!req.params.id || isNaN(Number(req.params.id)))
        return res.status(400).json({ error: 'Malformatted id' });
    const updatedPost = yield blogService_1.default
        .updatePost(Number(req.params.id), blog, req.userId); // checkLogin enforces userId to be a number
    return res.json(updatedPost);
}));
blogRouter.delete('/:id', utils_1.checkLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT user_id FROM blog WHERE id=$1;', [req.params.id]);
    if (result.rowCount === 0)
        return res.status(404).json({ error: 'Not found' });
    if (result.rows[0].user_id === req.userId) {
        yield db_1.default.query('DELETE FROM blog WHERE id=$1;', [req.params.id]);
        return res.json({ response: 'Post deleted' });
    }
    else
        return res.status(403).json({ error: 'Forbidden' });
}));
exports.default = blogRouter;
