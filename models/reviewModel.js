import { Schema, model } from 'mongoose'

const ReviewSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    reliability: { type: Number, float: true, default: 0 },
    usersRatedAmount: { type: Number, default: 0 },
    date: { type: Schema.Types.Date, required: true },
    pictureName: { type: String, required: true }
})

export const reviewModel = model("Review", ReviewSchema)
