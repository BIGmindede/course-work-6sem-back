const categoryController = require("../controllers/categoryController")
const authMiddleware = require("../middleware/authMiddleware")
const authorityMiddlewareDecorator = require("../middleware/authorityMiddlewareDecorator")

const Router = require("express").Router
const router = new Router()

router.post('/', authMiddleware,
    authorityMiddlewareDecorator('admin'), categoryController.create)

router.get('/', categoryController.getAll)

router.get('/:id', authMiddleware,
    authorityMiddlewareDecorator('admin'), categoryController.getOne)

router.put('/', authMiddleware,
    authorityMiddlewareDecorator('admin'), categoryController.update)

router.delete('/', authMiddleware,
    authorityMiddlewareDecorator('admin'), categoryController.remove)

module.exports = router