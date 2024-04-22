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
    async updateVoucher(voucherId, reqBody) {
        let data = {}
        try {
          data = await Voucher.findByIdAndUpdate(
            voucherId,
            { $set: reqBody },
            { new: true }
          );
        } catch (error) {
          console.error(error);
          return {
            status: 400,
            messageError: "Voucher không tồn tại",
          };
        }
    
        return {
          status: 200,
          data: data,
          message: "Voucher cập nhật thành công",
        };
      }
}

module.exports = new voucherService();
