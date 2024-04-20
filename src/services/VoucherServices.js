const Voucher = require('../models/Voucher');

class voucherService {
    async getAllVouchers(sortBy, page, limit) {
        let data = [];

        try {
            const options = {
                sort: sortBy,
                skip: (page - 1) * limit,
                limit: parseInt(limit)
            };

            const count = await Voucher.countDocuments();
            const totalPages = Math.ceil(count / limit);

            data = await Voucher.find({}, null, options).populate("categories_applied");

            return {
                status: 200,
                data: data,
                totalPages: totalPages,
                currentPage: parseInt(page),
                message: data.length !== 0 ? "OK" : "No data"
            };
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                messageError: error.message
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
