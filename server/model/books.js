let mongoose = require('mongoose');
const uuid = require('uuid');
let bookModel = mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
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

module.exports = mongoose.model('Book',bookModel);