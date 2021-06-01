const { ProductModel } = require('./productModel');
const { validationResult } = require('express-validator');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

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

exports.newProduct = upload.single('imageUrl'), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    req.file
    const doc = await ProductModel.create(req.body);
    res.status(201).json(doc);
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
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


// exports.newImage = upload.single('productImage'), (req, res, next) => {
//     req.file()
//     console.log(req.file)
// }