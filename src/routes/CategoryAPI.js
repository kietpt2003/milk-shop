const express = require("express");
const categoryController = require('../controller/CategoryController');

const CategoryRouter = (app) => {
    const router = express.Router();

    router.get('/', categoryController.getCategory);

    router.post('/', categoryController.createCategory);

    return app.use('/api/category', router);
}

module.exports = { CategoryRouter }
