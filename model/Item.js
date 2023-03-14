const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create item
const itemSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  date: {
    type: "Date",
    required: false,
  },
});

module.exports = Item = mongoose.model("item", itemSchema);
