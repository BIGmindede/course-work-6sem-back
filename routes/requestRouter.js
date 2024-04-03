const requestController = require("../controllers/requestController")
const authMiddleware = require("../middleware/authMiddleware")
const authorityMiddlewareDecorator = require("../middleware/authorityMiddlewareDecorator")

const Router = require("express").Router
const router = new Router()

router.post('/', authMiddleware, authorityMiddlewareDecorator(['user']), requestController.create)

router.get('/', authMiddleware, requestController.getAll)

// router.get('/:id', reviewController.getOne)

router.put('/:id', authMiddleware, authorityMiddlewareDecorator(['admin', 'moderator']), requestController.update)

router.delete('/:id', authMiddleware, authorityMiddlewareDecorator(['user']), requestController.remove)

module.exports = router