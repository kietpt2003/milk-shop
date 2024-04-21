const orderServices = require('../services/OrderServices');
const productServices = require('../services/ProductServices');

class OrderController {
    async getOrder(req, res) {
        let data = await orderServices.getAllOrders();
        return res.status(data.status).json(data);
    }
    async getChart(req, res) {
        const topPro = await productServices.getTopProducts();
        let data = await orderServices.getChartData(topPro);
        return res.status(data.status).json(data);
    }
    async createOrder(req, res) {
        let data = await orderServices.createOrder(req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new OrderController();
