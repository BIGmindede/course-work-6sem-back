const ApiError = require("../exceptions/apiError")
const jwtService = require("../services/jwtService")
const userService = require("../services/userService")

module.exports = (requiredRole) => async function(req, res, next) {
    try {
        const { refreshToken } = req.cookies
        const { user } = await jwtService.findToken(refreshToken)
        const { role } = await userService.getOne(user)
        if (role !== requiredRole) {
            next(ApiError.lowAuthorityError())
        }
        next()
        
    } catch (e) {
        return next(ApiError.unauthorizedError())
    }
}