const Category = require('../models/Category');

class categoryService {
    async getAllCategories() {
        let data = [];

        try {
            data = await Category.find({})
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
    async createCategory(reqBody) {
        let data = {};

        const category = new Category(reqBody);

        try {
            data = await category.save();
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

module.exports = new categoryService();
