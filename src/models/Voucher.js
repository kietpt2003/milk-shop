const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    discount: {
        type: Number,
        require: true
    },
    isPercent: {
        type: Boolean,
        default: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    categories_applied: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'category', // Reference to the Category schema
        }],
        require: true
    },
    end_at: {
        type: String,
        require: true
    },
}, {
    collection: 'voucher',
    versionKey: false
});


const Voucher = mongoose.model('voucher', voucherSchema);
module.exports = Voucher;
