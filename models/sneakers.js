const mongoose = require('mongoose');

var Sneaker = mongoose.model('Sneaker', {
    name: { type: String },
    brand: { type: String },
    price: { type: Number }
});

module.exports = {Sneaker} ;