const {model, Schema} = require("mongoose");


const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema);

module.exports = Comment