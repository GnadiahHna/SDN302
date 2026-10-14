const mongoose = require('mongoose');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

mongoose.connect('mongodb://localhost:27017/shop_order').then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Order.deleteMany({});

    const p1 = new Product({
        productName: "Wireless Mouse",
        category: "Electronics",
        stockStatus: "in_stock",
        unitPrice: 250000,
        tags: ["bestseller", "wireless", "accessory"]
    });

    const p2 = new Product({
        productName: "Mechanical Keyboard",
        category: "Electronics",
        stockStatus: "in_stock",
        unitPrice: 750000,
        tags: ["keyboard", "accessory"]
    });

    await p1.save();
    await p2.save();

    const o1 = new Order({
        customerName: "Nguyen Thi Lan",
        productName: "Wireless Mouse",
        quantity: 2,
        orderDate: new Date("2024-10-17T00:00:00Z"),
        totalPrice: 500000
    });
    
    const o2 = new Order({
        customerName: "Pham Van Duc",
        productName: "Mechanical Keyboard",
        quantity: 1,
        orderDate: new Date("2024-10-18T00:00:00Z"),
        totalPrice: 750000
    });

    await o1.save();
    await o2.save();

    console.log("Data seeded");
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});
