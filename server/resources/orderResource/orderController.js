const OrderModel = require('./orderModel');

exports.getAllOrders = async (req, res) => {
    const docs = await OrderModel.find({});
    res.status(200).json(docs);
};

exports.getOneOrder = async (req, res) => {
    const {_id} = req.body;
    const doc = await OrderModel.find({ _id: _id });
    res.status(200).json(doc);
};

exports.newOrder = async (req, res) => {
    const doc = await OrderModel.create(req.body);
    res.status(201).json(doc);
};

exports.updateOrder = async (req, res) => {
    const { _id } = req.body;
    const doc = await OrderModel.replaceOne({ _id: _id }, {...req.body});
    res.status(201).json(doc);
};