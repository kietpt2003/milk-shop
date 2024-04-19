const Voucher = require('../models/Voucher');

class voucherService {
    async getAllVouchers() {
        let data = [];

        try {
            data = await Voucher.find({})
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
    async createVoucher(reqBody) {
        let data = {};

        const voucher = new Voucher(reqBody);

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

module.exports = new voucherService();
