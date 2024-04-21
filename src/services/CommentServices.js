const Comment = require('../models/Comment');

class commentServices {
    async getAllComments() {
        let data = [];

        try {
            data = await Comment.find({})
            return {
                status: 200,
                data: data,
                message: data.length !== 0 ? "OK" : "No data",
            };
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                messageError: error.message,
            };
        }
    }
    async createComment(reqBody) {
        let data = {};

        const comment = new Comment(reqBody);

        try {
            data = await comment.save();
        } catch (error) {
            return {
                status: 400,
                messageError: error.message,
            };
        }

        return {
            status: 201,
            data: data,
            message: data.length !== 0 ? "OK" : "No data",
        };
    }
}

module.exports = new commentServices();
