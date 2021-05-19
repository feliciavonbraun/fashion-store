const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
	price: { type: Number, required: true },
	deliveryCompany: { type: String, required: true },
	deliveryTime: { type: String, required: true },
});

const ShippingModel = mongoose.model("shipping", ShippingSchema);
module.exports = ShippingModel;
