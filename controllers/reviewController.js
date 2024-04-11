import { reviewService } from "../services/reviewService.js"

class ReviewController {
    async create(req, res, next) {
        try {
            const { title, content, author, categoryName } = req.body
            const picture = req.files.picture
            const reviewData = await reviewService
                .create(title, content, author, categoryName, picture)
            return res.json(reviewData)
        } catch (e) {
            next(e)            
        }
    }
    async getAll(req, res, next) {
        try {
            const reviews = await reviewService.getAll()
            return res.json(reviews)
        } catch (e) {
            next(e)
        }
    }
    async getUserReviews(req, res, next) {
        try {
            const { userId } = req.params
            const reviews = await reviewService.getUserReviews(userId)
            return res.json(reviews)
        } catch (e) {
            next(e)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const review = await reviewService.getOne(id)
            return res.json(review)
        } catch (e) {
            next(e)            
        }
    }
    // async update(req, res, next) {
    //     try {
            
    //     } catch (e) {
    //         next(e)            
    //     }
    // }
    async remove(req, res, next) {
        try {
            const { id } = req.params
            const deletedReview = await reviewService.remove(id)
            return res.json(deletedReview)
        } catch (e) {
            next(e)            
        }
    }
}

export const reviewController = new ReviewController()
