const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    brandName: {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    percentageRating: {
        type: Number,
        require: false
    },
    quantity: {
        type: Number,
        require: true
    },
    sales: {
        type: Number,
        require: false
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    importedDate: {
        type: String,
        require: true
    },
    expiredDate: {
        type: String,
        require: true
    },
    imageURL: {
        type: String,
        require: true
    },
}, {
    collection: 'product',
    versionKey: false
});


const Product = mongoose.model('product', productSchema);
module.exports = Product;
