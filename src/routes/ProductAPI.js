const express = require("express");
const productController = require('../controller/ProductController');

const ProductRouter = (app) => {
    const router = express.Router();

    router.get('/', productController.getProduct);

    /**
 * @swagger
 * /api/product/top:
 *   get:
 *     summary: Get top product
 *     description: this endpoint is for getting top product
 *     tags:
 *         - Product
 *     responses:
 *       200:
 *         description: get all top product
 *         content:
 *           application/json:
 *             schema:        
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                  data:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id: 
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              brandName:
 *                                  type: string
 *                              category:
 *                                  type: string
 *                              price:
 *                                  type: number
 *                              quantity:
 *                                  type: number
 *                              sales:
 *                                  type: number
 *                              status:
 *                                  type: boolean
 *                              importedDate:
 *                                  type: string
 *                              expiredDate:
 *                                  type: string
 *                              imageURL:
 *                                  type: string
 *                              count:
 *                                  type: number
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request
 *         content:
 *             application/json:
 *                 schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: number
 *                              message:
 *                                  type: string
 */
    router.get('/top', productController.topProducts);

    router.post('/', productController.createProduct);

    return app.use('/api/product', router);
}

module.exports = { ProductRouter }
