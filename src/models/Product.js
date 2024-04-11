const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    us: {
        type: String,
        require: true
    },
    pw: {
        type: String,
        require: true
    },
}, { timestamps: true, });


const Products = mongoose.model('movies', productSchema);
module.exports = Products;
