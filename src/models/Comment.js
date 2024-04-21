const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "account",
        require: true
    },
    date: {
        type: String,
        require: true
    },
}, {
    collection: 'comment',
    versionKey: false
});


const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
