const bcrypt = require("bcrypt")
const uuid = require("uuid")
const UserModel = require('../models/userModel')
const mailService = require('./mailService')
const jwtService = require('./jwtService')
const UserDTO = require('../dtos/userDTO')
const ApiError = require('../exceptions/apiError')

class UserService {
    async register(email, password) {
        let user = await UserModel.findOne({ email })

        if (user) {
            throw ApiError.badRequestError(`Пользователь с адресом ${email} уже существует!`)
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        user = await UserModel.create({ email, password: hashedPassword, activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate_account/${activationLink}`)

        const userDTO = new UserDTO(user)
        const tokens = jwtService.generateTokens({ ...userDTO })
        await jwtService.saveToken(userDTO.id, tokens.refreshToken, activationLink)

        return { ...tokens, user: userDTO}
    }

    async login(email, password) {
        let user = await UserModel.findOne({ email })

        if (!user) {
            throw ApiError.badRequestError(`Пользователь с адресом ${email} не существует!`)
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ApiError.badRequestError(`Неверный пароль`)
        }

        if (!user.isActivated) {
            throw ApiError.inactiveAccountError()
        }

        const userDTO = new UserDTO(user)

        await jwtService.cleanExpiredSessions(userDTO.id)

        const tokens = jwtService.generateTokens({ ...userDTO })

        const authenticationLink = uuid.v4()
        await jwtService.saveToken(userDTO.id, tokens.refreshToken, authenticationLink)

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/authenticate_session/${authenticationLink}`)

        return { ...tokens, user: userDTO }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.badRequestError("Некорректная ссылка")
        }
        user.isActivated = true
        await user.save()
    }

    async getAllUsers() {
        const users = UserModel.find()
        return users
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const userData = jwtService.validateRefreshToken(refreshToken)
        const tokenFound = await jwtService.findToken(refreshToken)
        if (!userData || !tokenFound) {
            throw ApiError.unauthorizedError()
        }

        const user = UserModel.findById(userData.id)
        const userDTO = new UserDTO(user);
        const tokens = jwtService.generateTokens({ ...userDTO })

        await jwtService.saveToken(tokens.refreshToken)
        return { ...tokens, user: userDTO }
    }

    async logout(refreshToken) {
        const token = await jwtService.removeSession(refreshToken)
        return token
    }
}

module.exports = new UserService()
