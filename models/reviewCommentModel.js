const { Schema, model } = require("mongoose")

const ReviewCommentSchema = new Schema({
    review: { type: Schema.Types.ObjectId, ref: "Review" },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = model("ReviewComment", ReviewCommentSchema)