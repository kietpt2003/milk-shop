const express = require("express");
const voucherController = require('../controller/VoucherController');

const VoucherRouter = (app) => {
    const router = express.Router();

/**
 * @swagger
 * /api/voucher:
 *   get:
 *     summary: Get all voucher
 *     description: this endpoint is for getting voucher
 *     tags:
 *         - Voucher
 *     parameters:
 *       - in: query
 *         name: page
 *         description: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: limit item per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: get all voucher
 *         content:
 *           application/json:
 *             schema:        
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                  data:
 *                      type: object
 *                      properties:
 *                          _id: 
 *                              type: string
 *                          discount:
 *                              type: number
 *                          isPercent:
 *                              type: boolean
 *                          description:
 *                              type: string
 *                          categories_applied:
 *                              type: array
 *                          end_at:
 *                              type: string
 *       400:
 *         description: Bad request
 *         content:
 *             application/json:
 *                 schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: number
 *                              messageError:
 *                                  type: string
 */

    router.get('/', voucherController.getVoucher);

    router.post('/', voucherController.createVoucher);

    return app.use('/api/voucher', router);
}

module.exports = { VoucherRouter }
