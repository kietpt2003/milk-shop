const productServices = require('../services/ProductServices');

class ProductController {
    async getProduct(req, res) {
        let data = await productServices.getAllProducts(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
}

module.exports = new ProductController();
