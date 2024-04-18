const express = require("express");
const productController = require('../controller/ProductController');

const ProductRouter = (app) => {
    const router = express.Router();

    router.get('/', productController.getProduct);

    router.post('/', productController.createProduct);

    return app.use('/api/product', router);
}

module.exports = { ProductRouter }
