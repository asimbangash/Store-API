require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/products');
const jsonProducts = require('./product.json');

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        console.log('success....');
        await Product.deleteMany();
        await Product.create(jsonProducts);
    } catch (error) {
        console.log(error);
    }
}
start();