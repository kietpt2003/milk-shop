const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    products: {
        type: Array,
        require: false
    },
}, {
    collection: 'category',
    versionKey: false
});


const Category = mongoose.model('category', categorySchema);
module.exports = Category;
