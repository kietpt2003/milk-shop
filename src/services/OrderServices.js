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
            return {
                status: 400,
                messageError: error.message,
            };
        }
    }

    async getChartData(topPro) {
        let data = [];

        try {
            data = await calChart(topPro);
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

async function calChart(topPro) {
    // const topPro = await productServices.getTopProducts();
    if (topPro.status != 200) {
        return []
    } else {
        const data = topPro.data;
        const chartData = productsTrueQuantity(data);
        return chartData;
    }
}

function productsTrueQuantity(products) {
    const brandTrueQuantity = {};
    const sellPrice = {};

    // Iterate over the products array
    products.forEach(product => {
        const brandName = product.brandName;

        // If the brandName doesn't exist in the brandTrueQuantity object, initialize it to 1
        if (!brandTrueQuantity[brandName]) {
            brandTrueQuantity[brandName] = product.count;
            sellPrice[brandName] = product.count * product.price;
        } else {
            // If the brandName already exists in the brandTrueQuantity object, increment the count
            brandTrueQuantity[brandName] += product.count;
        }
    });

    // Convert the brandTrueQuantity object to an array of objects with brandName and count
    const result = Object.keys(brandTrueQuantity).map(brandName => ({
        brandName: brandName,
        trueQuantity: brandTrueQuantity[brandName]
    }));

    return result;
}


module.exports = new orderServices();
