const express = require('express');
const router = express.Router();
const data = require('../data');
const revData = data.reviews;
const bookData = data.books;

router.get('/:id', async (req, res) => {
  try {
    const book = await bookData.read(req.params.id);
    res.status(200).json(book.reviews);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.post('/:id', async (req, res) => {
  let revInfo = req.body;

  if(!revInfo) {
    res.status(400).json({ error: 'You must provide data to create a review' });
    return;
  }

  if(!revInfo.title || typeof revInfo.title != "string") {
    res.status(400).json({ error: 'You must provide title to create a review' });
    return;
  }

  if(!revInfo.reviewer || typeof revInfo.reviewer != "string") {
    res.status(400).json({ error: 'You must provide reviewer to create a review' });
    return;
  }

  if(!revInfo.bookBeingReviewed || typeof revInfo.bookBeingReviewed != "string") {
    res.status(400).json({ error: 'You must provide bookBeingReviewed to create a review' });
    return;
  }

  if(!revInfo.dateOfReview) {
    res.status(400).json({ error: 'You must provide dateOfReview published to create a review' });
    return;
  }

  if(!revInfo.rating || typeof revInfo.rating != "number") {
    res.status(400).json({ error: 'You must provide rating to create a review' });
    return;
  }

  if(!revInfo.review || typeof revInfo.review != "string") {
    res.status(400).json({ error: 'You must provide review to create a review' });
    return;
  }

  try {
    const book = await bookData.read(req.params.id);
    const review = await revData.create(revInfo.title, revInfo.reviewer, revInfo.bookBeingReviewed, revInfo.rating, revInfo.dateOfReview, revInfo.review);
    book.reviews.push(review);
    const Ubook = await bookData.update(req.params.id, book.title, book.author, book.genre, book.datePublished, book.summary, book.reviews);
    res.status(200).json(review);
  } catch (e) {
    res.status(400).json({ message: e});
  }
});

router.get('/:bookid/:revid', async (req, res) => {
  try {
    const book = await bookData.read(req.params.bookid);
    book.reviews.forEach(function (item) {
      if(item._id == req.params.revid) {
        res.status(200).json(item);
        return;
      }
    })
    return;
  } catch (e) {
    res.status(404).json({ message: e});
    return;
  }
});

router.delete('/:bookid/:revid', async (req, res) => {
  try {
    const book = await bookData.read(req.params.bookid);
    let count = 0;
    book.reviews.forEach(function (item) {
      if(item._id == req.params.revid) {
        book.reviews.splice(count, 1);
        return;
      }
      count++;
    })
    const del = await revData.remove(req.params.revid)
    const Ubook = await bookData.update(req.params.bookid, book.title, book.author, book.genre, book.datePublished, book.summary, book.reviews);
    let obj = {
      reviewId: req.params.revid,
      deleted: "true"
    }
    res.status(200).json(obj);
    return;
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
});

module.exports = router;