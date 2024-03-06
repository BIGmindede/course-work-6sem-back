const { Schema, model } = require("mongoose")

const ReviewSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    reliability: { type: Number, float: true, default: 0 },
    loadingDate: { type: Schema.Types.Date, default: new Date() }
})

module.exports = model("Review", ReviewSchema)