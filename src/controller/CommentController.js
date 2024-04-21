const commentServices = require('../services/CommentServices');

class CommentController {
    async getComment(req, res) {
        let data = await commentServices.getAllComments(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createComment(req, res) {
        let data = await commentServices.createComment(req.body);
        return res.status(data.status).json(data);
    }
    async getAverageRating(req, res){
        let data = await commentServices.getAverageRatingByProductId(req.query.productId);
        return res.status(data.status).json(data);
    }
}

module.exports = new CommentController();
