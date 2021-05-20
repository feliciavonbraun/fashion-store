const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
	price: { type: Number },
	deliveryCompany: { type: String },
	deliveryTime: { type: String },
});

const DeliveryModel = mongoose.model("delivery", DeliverySchema);
module.exports = DeliveryModel;
