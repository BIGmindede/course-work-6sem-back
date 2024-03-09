const UserDTO = require("../dtos/userDTO")
const userModel = require("../models/userModel")


class UserService {
    async getOne(id) {
        const user = await userModel.findOne({ _id: id })
        const userData = new UserDTO(user)
        return userData
    }
}

module.exports = new UserService()