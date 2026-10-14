const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
// Lấy PORT từ biến môi trường mà hosting cấp, nếu chạy local thì fallback về 3000
const port = process.env.PORT || 3000;

// Lấy URI từ MongoDB Atlas qua biến môi trường MONGODB_URI
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://danghaianh10a7_db_user:a0972440028@cluster0.fpvxukw.mongodb.net/shop_order?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI).then(() => {
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

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at port ${port}`);
});
