const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingStatusSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    receiver: {
        type: String,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    senderPhone: {
        type: String,
        require: true
    },
    licensePlate: {
        type: String,
        require: true
    },
    statusString: {
        type: String,
        require: true
    },
}, {
    collection: 'shipping_status',
    versionKey: false
});


const ShippingStatus = mongoose.model('shipping_status', shippingStatusSchema);
module.exports = ShippingStatus;
