const UserDTO = require("../dtos/userDTO")
const userModel = require("../models/userModel")


class UserService {
    async getAll() {
        const users = (await userModel.find()).map(user => new UserDTO(user))
        return users
    }

    async getOne(id) {
        const user = await userModel.findOne({ _id: id })
        const userData = new UserDTO(user)
        return userData
    }

    async banUser(id) {
        const user = await userModel.findOne({ _id: id })
        user.isActivated = false
        await user.save()
        return user
    }
}

module.exports = new UserService()