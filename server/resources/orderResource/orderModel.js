const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // firstname: {type: String},
    // lastname: {type: String},
    // email
    phone: {type: Number, required: [true, 'pls enter phone-nbr'] }, 
    street: {type: String, required: [true, 'pls enter street']},
    zipcode: {type: Number, required: [true, 'pls enter zipcode']}, 
    city: {type: String, required: [true, 'pls enter city']}, 
    totalprice: {type: Number},
    orderProducts: {object: []},
    isSent: {type: Boolean},
    // shippingId: objectId,
    // customerId: objectId,  
});

const OrderModel = mongoose.model('order', OrderSchema); 
module.exports = OrderModel; 