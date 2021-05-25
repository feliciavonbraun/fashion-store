const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
	price: { type: Number },
	company: { type: String },
	time: { type: Number },
});

const DeliveryModel = mongoose.model("delivery", DeliverySchema);
module.exports = DeliveryModel;
