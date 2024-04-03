const RequestDTO = require("../dtos/requestDTO")
const UserDTO = require("../dtos/userDTO")
const userModel = require("../models/userModel")
const userRequestModel = require("../models/userRequestModel")

class RequestService {
    async create(title, content, author) {
        const date = new Date()
        const request = await userRequestModel.create({ title, content, author, date })
        const relatedAuthor = await userModel.findOne(request.author)
        const requestData = new RequestDTO(request, new UserDTO(relatedAuthor))
        return requestData
    }

    async getAll() {
        const requests = Promise.all((await userRequestModel.find()).map(async model => {
            const author = await userModel.findOne(model.author)
            return new RequestDTO(model, new UserDTO(author))
        }))
        return requests
    }

    // async getOne() {

    // }

    async update(id, status) {
        const request = await userRequestModel.findOne({ _id: id })
        request.status = status
        const updatedRequest = await request.save()
        const relatedAuthor = await userModel.findOne(updatedRequest.author)
        return new RequestDTO(updatedRequest, new UserDTO(relatedAuthor))
    }

    async remove() {

    }
}

module.exports = new RequestService()