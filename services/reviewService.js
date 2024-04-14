import { CategoryDTO } from "../dtos/categoryDTO.js"
import { ReviewDTO } from "../dtos/reviewDTO.js"
import { UserDTO } from "../dtos/userDTO.js"
import { categoryModel } from "../models/categoryModel.js"
import { reviewCommentModel } from "../models/reviewCommentModel.js"
import { reviewModel } from "../models/reviewModel.js"
import { reviewRateModel } from "../models/reviewRateModel.js"
import { userModel } from "../models/userModel.js"
import { fileService } from "./fileService.js"
import { reviewRateService } from "./reviewRateService.js"

class ReviewService {
    async create(title, content, author, categoryName, picture) {
        const pictureName = fileService.saveFile(picture)
        const date = new Date()
        const categoryData = new CategoryDTO(await categoryModel.findOne({ title: categoryName }))
        const category = categoryData.id
        const review = await reviewModel
            .create({ title, content, author, category, pictureName, date })
        const relatedAuthor = await userModel.findOne(review.author)
        const relatedCategory = await categoryModel.findOne(review.category)
        const reviewData = new ReviewDTO(review, new UserDTO(relatedAuthor), relatedCategory.title)
        return reviewData
    }

    async getAll() {
        const reviews = Promise.all((await reviewModel.find()).map(async (model) => {
            const author = await userModel.findOne(model.author)
            return new ReviewDTO(model, new UserDTO(author))
        }))
        return reviews
    }

    async getUserReviews(userId) {
        const reviews = Promise.all((await reviewModel.find({ author: userId }))
            .map(async (model) => {
                const author = await userModel.findOne(model.author)
                const relatedCategory = await categoryModel.findOne(model.category)
                return new ReviewDTO(model, new UserDTO(author), relatedCategory.title)
            })
        )
        return reviews
    }

    async getOne(id) {
        const review = await reviewModel.findOne({ _id: id })
        const author = await userModel.findOne({ _id: review.author })
        const relatedCategory = await categoryModel.findOne(review.category)
        const reviewData = new ReviewDTO(review, new UserDTO(author), relatedCategory.title)
        return reviewData
    }

    async updateRate(id, rate, amountChange) {
        const review = await reviewModel.findOne({ _id: id })
        const newUsersRatedAmount = review.usersRatedAmount + amountChange
        const newSumRates = review.reliability * review.usersRatedAmount + rate
        review.reliability = newUsersRatedAmount === 0 ? 0 : newSumRates / newUsersRatedAmount
        review.usersRatedAmount = newUsersRatedAmount
        const reviewData = await review.save()
        return reviewData
    }

    async remove(id) {
        const deletedReview = await reviewModel.findOne({ _id: id })
        await reviewModel.deleteOne({ _id: id })
        await reviewRateModel.deleteMany({ review: id })
        await reviewCommentModel.deleteMany({ review: id })
        const deletedReviewData = new ReviewDTO(deletedReview, null, null)
        fileService.removeFile(deletedReviewData.pictureName)
        return deletedReviewData
    }
}

export const reviewService = new ReviewService()