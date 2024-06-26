const voucherServices = require('../services/VoucherServices');

class VoucherController {
    async getVoucher(req, res) {
        let data = await voucherServices.getAllVouchers(
            req.query.sort_by,
            req.query.page,
            req.query.limit
        );
        return res.status(data.status).json(data);
    }
    async createVoucher(req, res) {
        let data = await voucherServices.createVoucher(req.body);
        return res.status(data.status).json(data);
    }
    async updateVoucher(req, res) {
        let data = await voucherServices.updateVoucher(req.params.id, req.body);
        return res.status(data.status).json(data);
    }
    async getApplicableVouchers(req, res) {
        let data = await voucherServices.getApplicableVouchers(req.body.productIds);
        return res.status(data.status).json(data);
    }
}

module.exports = new VoucherController();
