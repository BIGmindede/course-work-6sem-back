const CategoryDTO = require("../dtos/categoryDTO")
const ReviewDTO = require("../dtos/reviewDTO")
const categoryModel = require("../models/categoryModel")
const reviewCommentModel = require("../models/reviewCommentModel")
const reviewModel = require("../models/reviewModel")
const reviewRateModel = require("../models/reviewRateModel")
const categoryService = require("./categoryService")
const fileService = require("./fileService")

class ReviewService {
    async create(title, content, author, categoryName, picture) {
        const pictureName = fileService.saveFile(picture)
        const date = new Date()
        const categoryData = await categoryModel.findOne({ title: categoryName })
        const category = categoryData.id
        const review = await reviewModel
            .create({ title, content, author, category, pictureName, date })
        const reviewData = new ReviewDTO(review)
        return reviewData
    }

    async getAll() {
        const reviews = (await reviewModel.find()).map(model => new ReviewDTO(model))
        return reviews
    }

    async getOne(id) {
        const review = await reviewModel.findOne({ id })
        const reviewData = new ReviewDTO(review)
        return reviewData
    }

    async update(id, rate) {
        
    }

    async remove(id) {
        const deletedReview = await reviewModel.findOne({ _id: id })
        await reviewModel.deleteOne({ _id: id })
        await reviewRateModel.deleteMany({ review: id })
        await reviewCommentModel.deleteMany({ review: id })
        const deletedReviewData = new ReviewDTO(deletedReview)
        fileService.removeFile(deletedReviewData.pictureName)
        return deletedReviewData
    }
}

module.exports = new ReviewService()