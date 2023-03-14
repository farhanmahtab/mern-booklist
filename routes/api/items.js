const express = require("express");
const router = express.Router();

//item model
const Item = require("../../model/Item");
//Get all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) =>
      res.json({
        status: 500,
        error: err,
      })
    );
});
//Post an item
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.json({
        status: 500,
        error: err,
      })
    );
});

//delet an item by id
router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        status: 200,
        message: "Item deleted successfully",
      })
    )
    .catch((err) =>
      res.json({
        status: 404,
        message: "Couldn't delete,Item Not found",
        error: err,
      })
    );
});
module.exports = router;
