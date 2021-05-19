const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please enter a product name'] },
    description: {
        type: String,
        required: [true, 'Please enter a product description'],
    },
    image: { type: String, required: [true, 'Please enter a product image'] },
    category: {
        type: [String],
        required: [true, 'Please enter a product category'],
    },
    qty: { type: Number, required: [true, 'Please enter a product quantity'] },
});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;
