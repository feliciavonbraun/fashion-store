const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    qty: { type: Number },
});

const AddressSchema = new mongoose.Schema({
    phone: { type: Number, required: [true, 'pls enter phone-nbr'] },
    street: { type: String, required: [true, 'pls enter street'] },
    zipcode: { type: Number, required: [true, 'pls enter zipcode'] },
    city: { type: String, required: [true, 'pls enter city'] },
});

const OrderSchema = new mongoose.Schema({
    orderItems: { type: [OrderItemSchema] }, 
    address: { type: AddressSchema },

    totalprice: { type: Number },
    isSent: { type: Boolean },
    createdAt: { type: Date },

    delivery: {type: mongoose.Schema.Types.ObjectId, ref: "delivery"}, 
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},  
});

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;