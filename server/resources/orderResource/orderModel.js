const mongoose = require('mongoose');
const { ProductSchema } = require('../productResource/productModel');

const OrderItemSchema = new mongoose.Schema({
    product: { type: ProductSchema },
    qty: { type: Number },
});

const AddressSchema = new mongoose.Schema({
    phone: { type: Number, required: [true, 'Please enter phone-number'] },
    street: { type: String, required: [true, 'Please enter street'] },
    zipcode: { type: Number, required: [true, 'Please enter zipcode'] },
    city: { type: String, required: [true, 'Please enter city'] },
});

const OrderSchema = new mongoose.Schema(
    {
        orderItems: { type: [OrderItemSchema] },
        address: { type: AddressSchema },

        totalprice: { type: Number },
        isSent: { type: Boolean },

        delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'delivery' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;
