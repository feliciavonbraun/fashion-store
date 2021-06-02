const OrderModel = require('./orderModel');
const { ProductModel } = require('../productResource/productModel');

exports.getAllOrders = async (req, res) => {
    const docs = await OrderModel.find({}).populate(['delivery', 'user']);
    res.status(200).json(docs);
};

exports.getOrder = async (req, res) => {
    const _id = req.params.id;
    const doc = await OrderModel.findOne({ _id: _id }).populate([
        'delivery',
        'user',
    ]);
    res.status(200).json(doc);
};

exports.getUserOrders = async (req, res) => {
    const user = req.session.id;
    const docs = await OrderModel.find({ user: user }).populate([
        'delivery',
        'user',
    ]);
    res.status(200).json(docs);
};

exports.newOrder = async (req, res) => {
    const { orderItems, delivery } = req.body;
    const user = req.session.id;

    /* REMOVES PRODUCTS IN ORDER THAT ARE NOT IN STOCK */
    const updatedOrderItems = orderItems.filter((i) => i.product.qty !== 0);

    /* ALTERS QTY OF PRODUCT IN ORDER TO FIT AVAILABLE STOCK */
    for (const item of updatedOrderItems) {
        const { product } = item;
        if (item.qty > product.qty) {
            item.qty = product.qty;
        }
    };

    const order = {
        ...req.body,
        user: user,
        delivery: delivery._id,
        orderItems: [...updatedOrderItems],
    };

    const doc = await OrderModel.create(order);

    /* UPDATES PRODUCT STOCK QUANTITY FOR EVERY ITEM IN ORDER */
    for (const item of updatedOrderItems) {
        const { product } = item;

        await ProductModel.updateOne(
            { _id: product._id },
            { qty: product.qty - item.qty }
        );
    };

    res.status(201).json(doc);
};

exports.updateOrder = async (req, res) => {
    const { _id, isSent } = req.body;
    const doc = await OrderModel.updateOne({ _id: _id }, { isSent: isSent });
    res.status(201).json(doc);
};