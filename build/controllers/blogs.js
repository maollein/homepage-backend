"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogsRouter = express_1.Router();
const blogs = [
    {
        title: "Gallian valloitus",
        author: "Julius Caesar",
        date: "2020-10-24",
        id: 1
    },
    {
        title: "Jerusalemin valloitus",
        author: "Titus",
        date: "2020-08-14",
        id: 2
    },
    {
        title: "Virtsan verotus",
        author: "Vespasianus",
        date: "2019-6-20",
        id: 3
    },
    {
        title: "Rooman hallitseminen",
        author: "Augustus",
        date: "2013-09-01",
        id: 4
    }
];
blogsRouter.get('/', (_req, res) => {
    return res.json(blogs);
});
exports.default = blogsRouter;
