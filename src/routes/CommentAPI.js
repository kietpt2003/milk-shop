const express = require("express");
const commentController = require('../controller/CommentController');

const CommentRouter = (app) => {
    const router = express.Router();

    router.get('/', commentController.getComment);

    router.post('/', commentController.createComment);

    return app.use('/api/comment', router);
}

module.exports = { CommentRouter }
