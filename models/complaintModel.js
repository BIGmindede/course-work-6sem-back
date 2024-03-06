const { Schema, model } = require("mongoose")

const ComplaintSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    target: { type: Schema.Types.ObjectId, ref: "User" },
    review: { type: Schema.Types.ObjectId, ref: "Review" },
    content: { type: String, required: true }
})

module.exports = model("Complaint", ComplaintSchema)