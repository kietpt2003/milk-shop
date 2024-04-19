const voucherServices = require('../services/VoucherServices');

class VoucherController {
    async getVoucher(req, res) {
        let data = await voucherServices.getAllVouchers(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createVoucher(req, res) {
        let data = await voucherServices.createVoucher(req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new VoucherController();
