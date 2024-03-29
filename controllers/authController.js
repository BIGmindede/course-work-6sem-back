const { validationResult } = require("express-validator")
const ApiError = require('../exceptions/apiError')
const authService = require('../services/authService')
const jwtService = require("../services/jwtService")

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequestError("Ошибка валидации", errors.array()))
            }
            const { email, password } = req.body
            const userData = await authService.register(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true })
            return res.json({ ...userData.user, accessToken: userData.accessToken })
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true })
            return res.json({ ...userData.user, accessToken: userData.accessToken })
        } catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)
            await jwtService.authenticateSession(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            next(e)
        }
    }

    async authenticateSession(req, res, next) {
        try {
            const authenticationLink = req.params.link
            await jwtService.authenticateSession(authenticationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true })
            return res.json({ ...userData.user, accessToken: userData.accessToken })
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AuthController()