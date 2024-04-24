const Order = require('../models/Order');
const ShippingStatus = require('../models/ShippingStatus');
class orderServices {
    async getAllOrders() {
        let data = [];

        try {
            data = await Order.find({}).populate("shippingList")
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

    async getOrderById(id) {
        let data = {};

        try {
            data = await Order.findById(id).populate('shippingList')
            return {
                status: 200,
                data: data,
                message: data ? "OK" : "No data",
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
        const { order, user } = reqBody;

        const voucher = new Order(order);

        try {
            data = await voucher.save();
            if (data) {
                const objShippingStatus = {
                    orderId: data._id,
                    date: data.timeOrder,
                    receiver: user.fullName,
                    sender: "Chưa có tài xế",
                    senderPhone: "Chưa có dữ liệu",
                    licensePlate: "Chưa có dữ liệu",
                    statusString: "Đang xử lí"
                }
                const shippingStatus = new ShippingStatus(objShippingStatus);
                data = await shippingStatus.save();
            }

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
    // const brandTrueQuantity = {};
    // const sellPrice = {};
    // const salePrice = {};

    // // Iterate over the products array
    // products.forEach(product => {
    //     const brandName = product.brandName;

    //     // If the brandName doesn't exist in the brandTrueQuantity object, initialize it to 1
    //     if (!brandTrueQuantity[brandName]) {
    //         brandTrueQuantity[brandName] = product.count;
    //         sellPrice[brandName] = (product.count * product.price);
    //         salePrice[brandName] = product.sales == 0 ? 0 : product.sales == 100 ? (product.count * product.price) : Math.round(product.count * ((100 - product.sales) / 100) * product.price);
    //     } else {
    //         // If the brandName already exists in the brandTrueQuantity object, increment the count
    //         brandTrueQuantity[brandName] += product.count;
    //         sellPrice[brandName] += (product.count * product.price);
    //         salePrice[brandName] += (product.sales == 0 ? 0 : product.sales == 100 ? (product.count * product.price) : Math.round(product.count * ((100 - product.sales) / 100) * product.price));
    //     }
    // });

    // // Convert the brandTrueQuantity object to an array of objects with brandName and count
    // const result = Object.keys(brandTrueQuantity).map(brandName => ({
    //     brandName: brandName,
    //     trueQuantity: brandTrueQuantity[brandName],
    //     sellPrice: sellPrice[brandName],
    //     salePrice: salePrice[brandName],
    //     totalPrice: sellPrice[brandName] - salePrice[brandName],
    // }));
    const result = products.map(product => {
        const sellPrice = (product.count * product.price);
        const salePrice = product.sales == 0 ? 0 : product.sales == 100 ? (product.count * product.price) : Math.round(product.count * ((100 - product.sales) / 100) * product.price);
        return {
            brandName: product.brandName,
            category: product.category.name,
            productId: product._id,
            productName: product.name,
            trueQuantity: product.count,
            sellPrice: sellPrice,
            salePrice: salePrice,
            totalPrice: sellPrice - salePrice,
        }
    });

    return result;
}


module.exports = new orderServices();
