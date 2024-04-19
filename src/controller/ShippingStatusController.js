const shippingStatusServices = require('../services/ShippingStatusServices');

class ShippingStatusController {
    async getShippingStatus(req, res) {
        let data = await shippingStatusServices.getAllShippingStatus(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createShippingStatus(req, res) {
        let data = await shippingStatusServices.createShippingStatus(req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new ShippingStatusController();
