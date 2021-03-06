const { ProductModel } = require('./productModel');
const { validationResult } = require('express-validator');

exports.getAllProducts = async (req, res) => {
    const docs = await ProductModel.find({});
    res.status(200).json(docs);
};

exports.getCategories = async (req, res) => {
    const docs = await ProductModel.find({}).distinct('category');
    res.status(200).json(docs);
};

exports.getCategoryProducts = async (req, res) => {
    const category = req.params.category;
    const docs = await ProductModel.find({ category: category });
    res.status(200).json(docs);
};

exports.getProduct = async (req, res) => {
    const _id = req.params.id;
    const doc = await ProductModel.findOne({ _id: _id });
    res.status(200).json(doc);
};

exports.postImage = async (req, res) => {
    if (req.files?.imageUrl) {
        const fileName = Date.now() + '-' + req.files.imageUrl.name;
        req.files.imageUrl.mv(`uploads/${fileName}`, () => {
            res.status(200).json(fileName);
        });
    } else {
        res.status(500).json('File could not be uploaded');
    }
};

exports.newProduct = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const doc = await ProductModel.create(req.body);
    res.status(201).json(doc);
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body;
    const doc = await ProductModel.replaceOne({ _id: _id }, req.body);
    res.status(200).json(doc);
};

exports.deleteProduct = async (req, res) => {
    const { _id } = req.body;
    const doc = await ProductModel.deleteOne({ _id: _id });
    res.status(200).json(doc);
};
