const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    shippingList: {
        type: Array,
        require: false
    },
    productList: {
        type: Array,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    totalDiscount: {
        type: Number,
        require: true
    },
    shippingFee: {
        type: Number,
        require: true
    },
    paymentMethod: {
        type: String,
        require: false
    },
    timeOrder: {
        type: String,
        require: true
    },
    timePayed: {
        type: String,
        require: true
    },
    timeStartShip: {
        type: String,
        require: true
    },
    timeCompletion: {
        type: String,
        require: true
    },
}, {
    collection: 'order',
    versionKey: false
});


const Order = mongoose.model('order', orderSchema);
module.exports = Order;
