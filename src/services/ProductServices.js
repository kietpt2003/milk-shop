const Product = require("../models/Product");
const mongoose = require("mongoose");
const OrderServices = require("./OrderServices");
const ObjectId = mongoose.Types.ObjectId;

class ProductServices {
  async getAllProducts() {
    let arrPros = [];

    try {
      arrPros = await Product.find({}).populate('category');
      return {
        status: 200,
        data: arrPros,
        message: arrPros.length !== 0 ? "OK" : "No data",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: error,
      };
    }
  }
  async getTopProducts() {
    let arrPros = [];

    try {
      arrPros = await Product.find({})
        .populate({
          path: "category",
        })
        .lean();
      const arrCountProductInOrder = await OrderServices.getCountedProduct();
      const productsWithCount = arrPros.map((product) => {
        for (let i = 0; i < arrCountProductInOrder.length; i++) {
          if (arrCountProductInOrder[i]._id === product._id.toString()) {
            return {
              ...product,
              count: arrCountProductInOrder[i].count,
            };
          }
        }
        return {
          ...product,
          count: 0,
        };
      });
      // console.log(productsWithCount);
      return {
        status: 200,
        data: productsWithCount,
        message: arrPros.length !== 0 ? "OK" : "No data",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: error,
      };
    }
  }
  async createProduct(reqBody) {
    const { name } = reqBody;

    try {
      // Check for duplicate product name
      const duplicateProduct = await this.getProductByName(name);
      if (duplicateProduct.status === 200) {
        return {
          status: 400,
          message: "Tên sản phẩm đã tồn tại",
        };
      }

      const product = new Product(reqBody);
      const savedProduct = await product.save();

      return {
        status: 201,
        data: savedProduct,
        message: "OK",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  async getProductByName(productName) {
    try {
      //productName can be uppercase or lowercase
      const product = await Product.findOne({
        name: { $regex: new RegExp(`^${productName}$`, "i") },
      }).populate("category", "name");

      if (product) {
        return {
          status: 200,
          data: product,
          message: "OK",
        };
      } else {
        return {
          status: 404,
          message: "Không tìm thấy sản phẩm",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  async updateProduct(productId, updatedFields) {
    try {
      const { name } = updatedFields;

      // Check for duplicate product name
      const duplicateProduct = await this.getProductByName(name);
      if (duplicateProduct.status === 200 && duplicateProduct.data._id.toString() !== productId) {
        return {
          status: 400,
          message: "Tên sản phẩm đã tồn tại",
        };
      }

      // Exclude `percentageRating` from the updatedFields object
      const { percentageRating, ...fieldsToUpdate } = updatedFields;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: fieldsToUpdate },
        { new: true }
      );

      if (updatedProduct) {
        return {
          status: 200,
          data: updatedProduct,
          message: "Cập nhật sản phẩm thành công",
        };
      } else {
        return {
          status: 404,
          message: "Không tìm thấy sản phẩm",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}

module.exports = new ProductServices();
