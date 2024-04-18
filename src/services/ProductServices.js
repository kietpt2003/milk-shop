const Product = require('../models/Product');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class ProductServices {
    async getAllProducts() {
        let arrPros = [];

        try {
            arrPros = await Product.find({})
            return {
                status: 200,
                data: arrPros,
                message: "Ok",
            };
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                data: arrPros,
                message: error,
            };
        }
    }
    async createProduct(reqBody) {
        try {
            let data = {};

            const product = new Product(reqBody);

            try {
                data = await product.save();
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
        } catch (error) {
            console.error("error ne", error);
            return {
                status: 500,
                messageError: error.toString(),
            };
        }
    }
}

module.exports = new ProductServices();
