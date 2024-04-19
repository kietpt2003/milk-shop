const express = require("express");
const voucherController = require('../controller/VoucherController');

const VoucherRouter = (app) => {
    const router = express.Router();

    router.get('/', voucherController.getVoucher);

    router.post('/', voucherController.createVoucher);

    return app.use('/api/voucher', router);
}

module.exports = { VoucherRouter }
