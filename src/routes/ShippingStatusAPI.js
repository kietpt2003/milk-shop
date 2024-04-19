const express = require("express");
const shippingStatusController = require('../controller/ShippingStatusController');

const ShippingStatusRouter = (app) => {
    const router = express.Router();

    router.get('/', shippingStatusController.getShippingStatus);

    router.post('/', shippingStatusController.createShippingStatus);

    return app.use('/api/shipping-status', router);
}

module.exports = { ShippingStatusRouter }
