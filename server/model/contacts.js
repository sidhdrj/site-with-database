let mongoose = require('mongoose');
let contactModel = mongoose.Schema({
        name: String,
        email: String,
        number: Number

    },

    {
        collection:"contact"
    });

module.exports = mongoose.model('contact',contactModel);