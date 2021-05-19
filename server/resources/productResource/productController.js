const express = require('express');
const Product = require('./productModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const docs = await Product.find({})
    res.status(200).json(docs);
});


module.exports = router;