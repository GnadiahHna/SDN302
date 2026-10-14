const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shop_order').then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Failed to connect to MongoDB", err);
});

// Set view engine
app.set('view engine', 'ejs');

// Cấu hình để nhận dữ liệu từ form
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
