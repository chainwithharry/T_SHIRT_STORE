const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    price: Number
})

const ProductCart = mongoose.model("ProductCart" , ProductCartSchema)

const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Delivered" , "Recieved" , "Cancelled" , "Shipped" , "Processing"]
    }
}, {timestamps: true}
);

const Order = mongoose.model("Order" , OrderSchema)

module.exports = {Order , ProductCart}







