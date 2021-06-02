const Delivery = require("./deliveryModel");

exports.getAllDeliveryMethods = async (req, res) => {
	const docs = await Delivery.find({});
	res.status(200).json(docs);
};