import { userController } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { authorityMiddlewareDecorator } from "../middleware/authorityMiddlewareDecorator.js"
import { Router } from "express"

const router = new Router()

router.get('/', authMiddleware, userController.getAll)

router.get('/:id', userController.getOne)

router.put('/setrole/:id', authMiddleware,
    authorityMiddlewareDecorator(['admin', 'moderator']),
    userController.setUserRole)

router.put('/unban/:id', authMiddleware,
    authorityMiddlewareDecorator(['admin', 'moderator']),
    userController.unbanUser)

router.put('/ban/:id', authMiddleware,
    authorityMiddlewareDecorator(['admin', 'moderator']),
    userController.banUser)

export const userRouter = router