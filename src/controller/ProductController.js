const productServices = require('../services/ProductServices');
class ProductController {
    async getProduct(req, res) {
        let data = await productServices.getAllProducts();
        return res.status(data.status).json(data);
    }
    async topProducts(req, res) {
        let data = await productServices.getTopProducts();
        return res.status(data.status).json(data);
    }
    async getProductByName(req, res) {
        let data = await productServices.getProductByName(req.query.name);
        return res.status(data.status).json(data);
    }
    async createProduct(req, res) {
        let data = await productServices.createProduct(req.body);
        return res.status(data.status).json(data);
    }
    async updateProduct(req, res) {
        let data = await productServices.updateProduct(req.params.id, req.body);
        return res.status(data.status).json(data);
    }
}

module.exports = new ProductController();
