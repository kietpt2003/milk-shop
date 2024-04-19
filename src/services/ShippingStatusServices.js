const ShippingStatus = require('../models/ShippingStatus');

class shippingStatusService {
    async getAllShippingStatus() {
        let data = [];

        try {
            data = await ShippingStatus.find({})
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
    async createShippingStatus(reqBody) {
        let data = {};

        const shippingStatus = new ShippingStatus(reqBody);

        try {
            data = await shippingStatus.save();
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

module.exports = new shippingStatusService();
