"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogRouter = express_1.Router();
const posts = [
    {
        title: "Gallian valloitus",
        author: "Julius Caesar",
        content: "<p>Veni, vidi, vici.</p>",
        date: "2020-10-24",
        id: 1
    },
    {
        title: "Jerusalemin valloitus",
        author: "Titus",
        content: "<p>Tuhosimme paikallisen temppelin.</p><p>Asukkaat eivät tykänneet.</p>",
        date: "2020-08-14",
        id: 2
    },
    {
        title: "Virtsan verotus",
        author: "Vespasianus",
        content: "<p>Raha ei haise.</p>",
        date: "2019-6-20",
        id: 3
    },
    {
        title: "Rooman hallitseminen",
        author: "Augustus",
        content: "<p>Olen vain ensimmäinen kansalainen.</p>",
        date: "2013-09-01",
        id: 4
    },
    {
        title: "Vesuviuksen purkautuminen",
        author: "Plinius nuorempi",
        content: "<p>Vesuviuksen purkautuminen oli subliimi tapahtuma.</p>",
        date: "2014-09-07",
        id: 5
    }
];
blogRouter.get('/', (_req, res) => {
    return res.json(posts);
});
exports.default = blogRouter;
