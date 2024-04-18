const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: false
    },
    gender: {
        type: Boolean,
        default: true,
        require: false
    },
    role: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
}, {
    collection: 'account',
    versionKey: false
});


const Account = mongoose.model('account', accountSchema);
module.exports = Account;
