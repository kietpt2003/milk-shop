const categoryServices = require('../services/CategoriesServices');

class CategoryController {
    async getCategory(req, res) {
        let data = await categoryServices.getAllCategories(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createCategory(req, res) {
        let data = await categoryServices.createCategory(req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new CategoryController();
