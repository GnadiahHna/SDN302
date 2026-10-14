const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.render('order', { orders });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getCreateOrder = async (req, res) => {
    try {
        const products = await Product.find({ stockStatus: { $ne: 'discontinued' } });
        res.render('createOrder', { products });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.postCreateOrder = async (req, res) => {
    try {
        const { customerName, productName, quantity, orderDate } = req.body;
        const product = await Product.findOne({ productName: productName });
        if (!product) {
            return res.status(400).send('Product not found');
        }
        
        const totalPrice = product.unitPrice * quantity;
        const newOrder = new Order({
            customerName,
            productName,
            quantity,
            orderDate: new Date(orderDate),
            totalPrice
        });
        
        await newOrder.save();
        res.redirect('/orders');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getUpdateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const products = await Product.find({ stockStatus: { $ne: 'discontinued' } });
        res.render('updateOrder', { order, products });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.postUpdateOrder = async (req, res) => {
    try {
        const { customerName, productName, quantity, orderDate } = req.body;
        const product = await Product.findOne({ productName: productName });
        if (!product) {
            return res.status(400).send('Product not found');
        }
        
        const totalPrice = product.unitPrice * quantity;
        
        await Order.findByIdAndUpdate(req.params.id, {
            customerName,
            productName,
            quantity,
            orderDate: new Date(orderDate),
            totalPrice
        });
        
        res.redirect('/orders');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/orders');
    } catch (err) {
        res.status(500).send(err);
    }
};
