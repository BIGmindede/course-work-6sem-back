const Router = require("express").Router
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const authorityMiddlewareDecorator = require("../middleware/authorityMiddlewareDecorator")

const router = new Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/ban/:id', authMiddleware,
    authorityMiddlewareDecorator(['admin', 'moderator']),
    userController.banUser)

module.exports = router