const express = require("express");
const productsController = require('../controller/ProductController');

const FurnitureRouter = (app) => {
    const router = express.Router();

    router.get('/', productsController.getProduct);

    return app.use('/api/product', router);
}