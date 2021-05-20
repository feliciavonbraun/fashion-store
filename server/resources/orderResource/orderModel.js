const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    // product: { type: Product }, // denna typningen???
    qty: { type: Number },
});

const AddressSchema = new mongoose.Schema({
    phone: { type: Number, required: [true, 'pls enter phone-nbr'] },
    street: { type: String, required: [true, 'pls enter street'] },
    zipcode: { type: Number, required: [true, 'pls enter zipcode'] },
    city: { type: String, required: [true, 'pls enter city'] },
});

const OrderSchema = new mongoose.Schema({
    orderItem: { type: OrderItemSchema }, // denna ska va en [], hur????
    address: { type: AddressSchema },

    totalprice: { type: Number },
    isSent: { type: Boolean },
    createdAt: { type: Date },

    // delivery: objectId, 
    // user: objectId,  
});

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;

// SE ÖVER DENNA FIL 