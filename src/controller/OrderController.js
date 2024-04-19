const orderServices = require('../services/OrderServices');

class OrderController {
    async getOrder(req, res) {
        let data = await orderServices.getAllOrders(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createOrder(req, res) {
        let data = await orderServices.createOrder(req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new OrderController();
