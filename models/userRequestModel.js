const { Schema, model } = require('mongoose')

const UserRequestSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String },
    date: { type: Schema.Types.Date, required: true }
})

module.exports = model("UserRequest", UserRequestSchema)
