const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;

router.get('/', async (req, res) => {
  try {
    const books = await bookData.readAll();
    res.status(200).json(books);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const books = await bookData.read(req.params.id);
    res.status(200).json(books);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.post('/', async (req, res) => {
  let bookInfo = req.body;

  if(!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }

  if(!bookInfo.title || typeof bookInfo.title != "string") {
    res.status(400).json({ error: 'You must provide title to create a book' });
    return;
  }

  if(!bookInfo.author || typeof bookInfo.author != "object") {
    res.status(400).json({ error: 'You must provide author to create a book' });
    return;
  }

  if(!bookInfo.genre || !Array.isArray(bookInfo.genre)) {
    res.status(400).json({ error: 'You must provide genre to create a book' });
    return;
  }

  if(!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide date published to create a book' });
    return;
  }

  if(!bookInfo.summary || typeof bookInfo.summary != "string") {
    res.status(400).json({ error: 'You must provide summary to create a book' });
    return;
  }


  try {
    const newBook = await bookData.create(
      bookInfo.title,
      bookInfo.author,
      bookInfo.genre,
      bookInfo.datePublished,
      bookInfo.summary,
      []
    );
    res.status(200).json(newBook);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let bookInfo = req.body;

  if(!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }

  if(!bookInfo.title || typeof bookInfo.title != "string") {
    res.status(400).json({ error: 'You must provide title to create a book' });
    return;
  }

  if(!bookInfo.author || typeof bookInfo.author != "object") {
    res.status(400).json({ error: 'You must provide author to create a book' });
    return;
  }

  if(!bookInfo.genre || !Array.isArray(bookInfo.genre)) {
    res.status(400).json({ error: 'You must provide genre to create a book' });
    return;
  }

  if(!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide date published to create a book' });
    return;
  }

  if(!bookInfo.summary || typeof bookInfo.summary != "string") {
    res.status(400).json({ error: 'You must provide summary to create a book' });
    return;
  }

  try {
    let book = await bookData.read(req.params.id);
    bookInfo.reviews = book.reviews;
    const Ubook = await bookData.update(req.params.id, bookInfo.title, bookInfo.author, bookInfo.genre, bookInfo.datePublished, bookInfo.summary, bookInfo.reviews);
    res.status(200).json(Ubook);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
});

router.patch('/:id', async (req, res) => {
  let bookInfo = req.body;
  let book = await bookData.read(req.params.id);

  if(!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }

  if(!bookInfo.title) {
    bookInfo.title = book.title;
  }

  if(!bookInfo.author) {
    bookInfo.author = book.author;
  }

  if(!bookInfo.genre) {
    bookInfo.genre = book.genre;
  }

  if(!bookInfo.datePublished) {
    bookInfo.datePublished = book.datePublished;
  }

  if(!bookInfo.summary) {
    bookInfo.summary = book.summary;
  }

  if(!bookInfo.reviews) {
    bookInfo.reviews = book.reviews;
  } else {
    bookInfo.reviews.push(book.reviews);
  }

  try {
    const Ubook = await bookData.update(req.params.id, bookInfo.title, bookInfo.author, bookInfo.genre, bookInfo.datePublished, bookInfo.summary, bookInfo.reviews);
    res.status(200).json(Ubook);
    return;
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const del = await bookData.remove(req.params.id);
    let obj = {
      bookId: req.params.id,
      deleted: "true"
    }
    res.status(200).json(obj);
    return;
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
});

module.exports = router;