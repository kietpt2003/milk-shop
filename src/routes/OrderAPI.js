const express = require("express");
const orderController = require('../controller/OrderController');

const OrderRouter = (app) => {
    const router = express.Router();

    router.get('/', orderController.getOrder);

    router.post('/', orderController.createOrder);

    return app.use('/api/order', router);
}

module.exports = { OrderRouter }
