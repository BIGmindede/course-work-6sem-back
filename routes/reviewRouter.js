const reviewController = require("../controllers/reviewController")
const authMiddleware = require("../middleware/authMiddleware")
const authorityMiddlewareDecorator = require("../middleware/authorityMiddlewareDecorator")

const Router = require("express").Router
const router = new Router()

router.post('/', authMiddleware, reviewController.create)

router.get('/', reviewController.getAll)

router.get('/:id', reviewController.getOne)

// Только для пересчета оценок
router.put('/', authMiddleware,
    authorityMiddlewareDecorator(['user']), reviewController.update)

router.delete('/:id', authMiddleware, reviewController.remove)

module.exports = router