const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Product = require('../models/Product')

class commentServices {
  async getAllComments() {
    let data = [];

    try {
      data = await Comment.find({}).populate("author");
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
  async createComment(reqBody) {
    const { author, productId } = reqBody;

    try {
      // Check if the author has already commented on the product
      const existingComment = await Comment.findOne({ author, productId });

      if (existingComment) {
        return {
          status: 400,
          messageError: "Bạn đã comment cho sản phẩm này",
        };
      }

      const comment = new Comment({
        ...reqBody,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      });

      const data = await comment.save();

      // Calculate the new average rating for the product
      const averageRatingResult = await this.getAverageRatingByProductId(productId);
      if (averageRatingResult.status === 200) {
        const averageRating = averageRatingResult.averageRating;

        // Update the percentageRating of the product
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            percentageRating: averageRating,
          }
        );

        if (!updatedProduct) {
          return {
            status: 404,
            message: "Không tìm thấy sản phẩm",
          };
        }
      }

      return {
        status: 201,
        data: data,
        message: data.length !== 0 ? "OK" : "No data",
      };
    } catch (error) {
      return {
        status: 400,
        messageError: 'Tạo comment thất bại',
      };
    }
  }
  async getAverageRatingByProductId(productId) {
    try {
      const result = await Comment.aggregate([
        {
          $match: { productId: new mongoose.Types.ObjectId(productId) },
        },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
          },
        },
      ]);
      if (result.length > 0) {
        const averageRating = parseFloat(result[0].averageRating.toFixed(1));
        return {
          status: 200,
          averageRating: averageRating,
          message: "OK",
        };
      } else {
        return {
          status: 404,
          message: "No comments found for the product",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        messageError: "Internal server error",
      };
    }
  }
}

module.exports = new commentServices();
