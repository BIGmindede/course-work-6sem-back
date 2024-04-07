import { Schema, model } from 'mongoose'

const ReviewCommentSchema = new Schema({
    review: { type: Schema.Types.ObjectId, ref: "Review" },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

export const reviewCommentModel = model("ReviewComment", ReviewCommentSchema)