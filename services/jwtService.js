const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const TokenModel = require('../models/tokenModel')
const ApiError = require("../exceptions/apiError")
const userService = require("./userService")
const UserModel = require("../models/userModel")

class JWTService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async isSessionActive(refreshToken) {
        const refreshTokenData = await TokenModel.findOne({ refreshToken })
        if (!refreshTokenData.isActivated) {
            return false
        }
        return true
    }

    async cleanExpiredSessions(userId) {
        const sessions = await TokenModel.find({ user: userId })
        await Promise.all(sessions.map( async (session) => {
            const isTokenValid = this.validateRefreshToken(session.refreshToken)
            if (isTokenValid === null) {
                await this.removeSession(session.refreshToken)
            }
        }))
    }

    async saveToken(userId, refreshToken, authenticationLink) {
        const tokenData = await TokenModel.findOne({ user: userId, authenticationLink })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({ user: userId, refreshToken, authenticationLink })
        return token
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }

    async authenticateSession(authenticationLink) {
        const session = await TokenModel.findOne({ authenticationLink })
        if (!session) {
            throw ApiError.badRequestError("Некорректная сессия")
        }
        session.isActivated = true
        await session.save()
    }

    async removeSession(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken })
        return tokenData
    }
}

module.exports = new JWTService()
