const express = require('express');
const Product = require('./productModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const docs = await Product.find({})
    res.status(200).json(docs);
});

router.post('/', async (req, res) => {
    await Product.create(req.body)
    res.status(201).json(req.body)
})

module.exports = router;