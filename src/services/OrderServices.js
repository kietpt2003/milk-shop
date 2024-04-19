const Order = require('../models/Order');

class orderServices {
    async getAllOrders() {
        let data = [];

        try {
            data = await Order.find({})
            return {
                status: 200,
                data: data,
                message: data.length !== 0 ? "OK" : "No data",
            };
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                messageError: error.message,
            };
        }
    }
    async createOrder(reqBody) {
        let data = {};

        const voucher = new Order(reqBody);

        try {
            data = await voucher.save();
        } catch (error) {
            return {
                status: 400,
                messageError: error.message,
            };
        }

        return {
            status: 201,
            data: data,
            message: data.length !== 0 ? "OK" : "No data",
        };
    }
}

module.exports = new orderServices();
