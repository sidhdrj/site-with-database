let mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  text: String,
  author: String
});
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    stars: Number,
    price: Number

},

{
    collection:"books"
});

module.exports = mongoose.model('book',bookModel);