const express = require("express");
const commentController = require('../controller/CommentController');

const CommentRouter = (app) => {
    const router = express.Router();

    router.get('/', commentController.getComment);
    router.get('/averageRating', commentController.getAverageRating);

    router.post('/', commentController.createComment);

    return app.use('/api/comment', router);
}

module.exports = { CommentRouter }
