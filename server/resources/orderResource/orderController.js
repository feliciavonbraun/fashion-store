const OrderModel = require('./orderModel');
const { ProductModel } = require('../productResource/productModel');

exports.getAllOrders = async (req, res) => {
    const docs = await OrderModel.find({}).populate(['delivery', 'user']);
    res.status(200).json(docs);
};

exports.getOneOrder = async (req, res) => {
    const { _id } = req.body;
    const doc = await OrderModel.find({ _id: _id }).populate([
        'delivery',
        'user',
    ]);
    res.status(200).json(doc);
};

exports.newOrder = async (req, res) => {
    const { orderItems } = req.body;

    /* REMOVES PRODUCTS IN ORDER THAT ARE NOT IN STOCK */
    const updatedOrderItem = orderItems.filter((i) => i.product.qty !== 0);

    /* ALTERS QTY OF PRODUCT IN ORDER TO FIT AVAILABLE STOCK */
    for (const item of updatedOrderItem) {
        const { product } = item;
        if (item.qty > product.qty) {
            item.qty = product.qty;
        }
    }

    const order = { ...req.body, orderItem: [...updatedOrderItem] };
    const doc = await OrderModel.create(order);

    /* UPDATES PRODUCT STOCK QUANTITY FOR EVERY ITEM IN ORDER */
    for (const item of orderItems) {
        const { product } = item;

        await ProductModel.updateOne(
            { _id: product._id },
            { qty: product.qty - item.qty }
        );
    }

    res.status(201).json(doc);
};

exports.updateOrder = async (req, res) => {
    const { _id } = req.body;
    const doc = await OrderModel.replaceOne({ _id: _id }, { ...req.body });
    res.status(201).json(doc);
};
