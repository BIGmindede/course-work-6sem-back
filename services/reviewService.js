const ReviewDTO = require("../dtos/reviewDTO")
const UserDTO = require("../dtos/userDTO")
const categoryModel = require("../models/categoryModel")
const reviewCommentModel = require("../models/reviewCommentModel")
const reviewModel = require("../models/reviewModel")
const reviewRateModel = require("../models/reviewRateModel")
const userModel = require("../models/userModel")
const fileService = require("./fileService")

class ReviewService {
    async create(title, content, author, categoryName, picture) {
        const pictureName = fileService.saveFile(picture)
        const date = new Date()
        const categoryData = await categoryModel.findOne({ title: categoryName })
        const category = categoryData.id
        const review = await reviewModel
            .create({ title, content, author, category, pictureName, date })
        const relatedAuthor = await userModel.findOne(review.author)
        const reviewData = new ReviewDTO(review, new UserDTO(relatedAuthor))
        return reviewData
    }

    async getAll() {
        
        const reviews = Promise.all((await reviewModel.find()).map(async (model) => {
            const author = await userModel.findOne(model.author)
            return new ReviewDTO(model, new UserDTO(author))
        }))
        return reviews
    }

    async getOne(id) {
        const review = await reviewModel.findOne({ id })
        const author = await userModel.findOne(review.author)
        const reviewData = new ReviewDTO(review, new UserDTO(author))
        return reviewData
    }

    async update(id, rate) {
        
    }

    async remove(id) {
        const deletedReview = await reviewModel.findOne({ _id: id })
        await reviewModel.deleteOne({ _id: id })
        await reviewRateModel.deleteMany({ review: id })
        await reviewCommentModel.deleteMany({ review: id })
        const deletedReviewData = new ReviewDTO(deletedReview, null)
        fileService.removeFile(deletedReviewData.pictureName)
        return deletedReviewData
    }
}

module.exports = new ReviewService()