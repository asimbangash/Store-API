const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:[true, 'must provide name']
    },
    price:{
        type:String,
        requried:[true,'price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        requried:true,
        enum:{
            values:['dell','hp','redmi','iphon','samsung','thinkpad','ikea','liddy','caressa','marcos'],
            message:`{VALUE} is not support`
        }
    }
});

module.exports = mongoose.model('Product',productSchema);