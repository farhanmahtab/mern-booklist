const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create item
const bookSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  author: {
    type: "String",
    required: false,  
  },
  price : {
    type:"number",
    required:false,
  }
});

module.exports = Book = mongoose.model("book", bookSchema);