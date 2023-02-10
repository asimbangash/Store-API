require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./router/products');
const notFound = require('./middleware/not-found');

const PORT = process.env.PORT || 4000;
// middleware
app.use(express.json());

// router
app.use("/api/v1/product",productRouter);
app.use(notFound);

app.get("/",(req,res)=>{
    res.send("hello from server side");
});

const start = async(req,res)=>{
    try {
        await connectDB(process.env.MONGO_URL);
        return app.listen(PORT,()=>{
            console.log(`server is running at port no ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();