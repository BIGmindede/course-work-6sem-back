import { UserDTO } from "../dtos/userDTO.js"
import { userModel } from "../models/userModel.js"


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

    async setUserRole(id, role) {
        const user = await userModel.findOne({ _id: id })
        user.role = role
        await user.save()
        return user
    }

    async unbanUser(id) {
        const user = await userModel.findOne({ _id: id })
        user.isActivated = true
        await user.save()
        return user
    }

    async banUser(id) {
        const user = await userModel.findOne({ _id: id })
        user.isActivated = false
        await user.save()
        return user
    }
}

export const userService = new UserService()