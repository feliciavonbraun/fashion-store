const Delivery = require("./deliveryModel");

exports.getAllDeliveryOptions = async (req, res) => {
	const docs = await Delivery.find({});
	res.status(200).json(docs);
};

exports.getDeliveryOption = async (req, res) => {
	const { _id } = req.body;
	const doc = await Delivery.find({ _id: _id });
	res.status(200).json(doc);
};

exports.newDelivery = async (req, res) => {
	const doc = await Delivery.create(req.body);
	res.status(201).json(doc);
};
