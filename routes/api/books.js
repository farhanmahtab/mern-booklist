const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware/auth");
//book model
const book = require("../../model/Book");

//Get all books
router.get("/", (req, res) => {
  book
    .find()
    .sort({ price: -1 })
    .then((books) => res.json(books))
    .catch((err) =>
      res.json({
        status: 500,
        error: err,
      })
    );
});

router.use(authenticate);
//Post a book
router.post("/", (req, res) => {
  const newbook = new book({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  });
  newbook
    .save()
    .then((book) => res.json(book))
    .catch((err) =>
      res.json({
        status: 500,
        error: err,
      })
    );
});
//delete book
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Book.findById(req.params.id)
    .then((book) =>
      book.deleteOne().then(() =>
        res.json({
          id: req.params.id,
          message: "book Deleted",
        })
      )
    )
    .catch((err) =>
      res.status(404).json({
        message: "book not found",
      })
    );
});

module.exports = router;
