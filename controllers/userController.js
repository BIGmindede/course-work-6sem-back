import { userService } from "../services/userService.js"

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await userService.getOne(id)
            return res.json(user)
        } catch (e) {
            next(e)            
        }
    }
    async setUserRole(req, res, next) {
        try {
            const { id } = req.params
            const { role } = req.body 
            const settingUser = await userService.setUserRole(id, role)
            return res.json(settingUser)
        } catch (e) {
            next(e)            
        }
    }
    async unbanUser(req, res, next) {
        try {
            const { id } = req.params
            const unbannedUser = await userService.unbanUser(id)
            return res.json(unbannedUser)
        } catch (e) {
            next(e)            
        }
    }
    async banUser(req, res, next) {
        try {
            const { id } = req.params
            const bannedUser = await userService.banUser(id)
            return res.json(bannedUser)
        } catch (e) {
            next(e)            
        }
    }
}

export const userController = new UserController()
