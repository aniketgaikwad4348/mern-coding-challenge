const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    value: Number,
    image: String // Add image field
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
