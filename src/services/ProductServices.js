const Products = require('../models/Product');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class ProductServices {
    async getAllProducts() {
        let arrPros = [];

        try {
            arrPros = await Products.find({})
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
}

module.exports = new ProductServices();
