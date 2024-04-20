const Order = require('../models/Order');

class orderServices {
    async getAllOrders() {
        let data = [];

        try {
            data = await Order.find({})
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

    async createOrder(reqBody) {
        let data = {};

        const voucher = new Order(reqBody);

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

    async getCountedProduct() {
        let data = [];

        try {
            data = await Order.find({});
            return countProducts(data);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}


function countProducts(orders) {
    const productsMap = new Map(); // Use a Map to store product counts

    // Iterate through each order
    orders.forEach(order => {
        // Iterate through each product in the order
        order.productList.forEach(product => {
            // Check if the product already exists in the productsMap
            if (productsMap.has(product._id.toString())) {
                // If exists, increment the count
                const count = productsMap.get(product._id.toString());
                productsMap.set(product._id.toString(), count + product.quantity);
            } else {
                // If not exists, add the product to the productsMap with count
                productsMap.set(product._id.toString(), product.quantity);
            }
        });
    });

    // Convert productsMap to array of products
    const products = [];
    productsMap.forEach((count, _id) => {
        products.push({ _id, count });
    });

    return products;
}

module.exports = new orderServices();
