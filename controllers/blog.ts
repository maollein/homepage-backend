import { Router } from 'express';

const blogRouter = Router();

const posts = [
  {
    title: "Gallian valloitus",
    author: "Matti",
    content: "<p>Julius Caesar valloitti suuren osan Galliasta.</p>",
    date: "2020-10-24",
    id: 1
  },
  {
    title: "Jerusalemin valloitus",
    author: "Matti",
    content: "<p>Titus Vespasianus komensi Rooman joukkoja Jerusalemin valtauksen aikana.</p><p>Hänestä tuli myöhemmin keisari ja hänet tunnetaan nimellään Titus.</p>",
    date: "2020-08-14",
    id: 2
  },
  {
    title: "Vespasianus",
    author: "Matti",
    content: "<p>Sanonta 'raha ei haise' periytyy kertoman mukaan keisari Vespasianukselta.</p>",
    date: "2019-6-20",
    id: 3
  },
  {
    title: "Augustus",
    author: "Matti",
    content: "<p>Augustus oli Rooman ensimmäinen keisari ja menestyksekäs hallitsija.</p>",
    date: "2013-09-01",
    id: 4
  },
  {
    title: "Vesuviuksen purkautuminen",
    author: "Matti",
    content: "<p>Vesuvius purkautui vuonna 79 jKr. tuhoten muun muassa Pompejin kaupungin.</p>",
    date: "2014-09-07",
    id: 5
  }
];

blogRouter.get('/', (_req, res) => {
  return res.json(posts);
});

export default blogRouter;