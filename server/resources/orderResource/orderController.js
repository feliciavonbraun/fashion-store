const Order = require('./orderModel');

exports.getAllOrders = async (req, res) => {
    const docs = await Order.find({});
    res.status(200).json(docs);
};

exports.getOneOrder = async (req, res) => {
    const {_id} = req.body;
    const doc = await Order.find({ _id: _id });
    res.status(200).json(doc);
};

exports.newOrder = async (req, res) => {
    const doc = await Order.create(req.body);
    res.status(201).json(doc);
};

exports.updateOrder = async (req, res) => {
    const { _id } = req.body;
    const doc = await Order.replaceOne({ _id: _id }, {...req.body});
    res.status(201).json(doc);
};