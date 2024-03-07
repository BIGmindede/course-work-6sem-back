const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    title: { type: String, required: true },
    request: { type: Schema.Types.ObjectId, ref: "UserRequest", default: null},
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = model("Category", CategorySchema)
