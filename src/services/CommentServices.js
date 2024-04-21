const mongoose = require('mongoose');
const Comment = require('../models/Comment');

class commentServices {
    async getAllComments() {
        let data = [];

        try {
            data = await Comment.find({}).populate("author")
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
    async getAverageRatingByProductId(productId) {
        try {
            const result = await Comment.aggregate([
                {
                    $match: { productId: new mongoose.Types.ObjectId(productId) }
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" }
                    }
                }
            ]);
            if (result.length > 0) {
                const averageRating = parseFloat(result[0].averageRating.toFixed(1));
                return {
                    status: 200,
                    averageRating: averageRating,
                    message: "OK"
                };
            } else {
                return {
                    status: 404,
                    message: "No comments found for the product"
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                messageError: "Internal server error"
            };
        }
    }
}

module.exports = new commentServices();
