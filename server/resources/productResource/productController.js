const Product = require('./productModel');

exports.getAllProducts = async (req, res) => {
    const docs = await Product.find({});
    res.status(200).json(docs);
};

exports.getProduct = async (req, res) => {
    const _id = req.params.id;
    const doc = await Product.findOne({ _id: _id });
    res.status(200).json(doc);
};

exports.newProduct = async (req, res) => {
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
};

exports.updateProduct = async (req, res) => {
    const { _id } = req.body;
    const doc = await Product.replaceOne({ _id: _id }, { ...req.body });
    res.status(200).json(doc);
};

exports.deleteProduct = async (req, res) => {
    const { _id } = req.body;
    const doc = await Product.deleteOne({ _id: _id });
    res.status(200).json(doc);
};
