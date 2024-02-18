const Router = require("express").Router
const { body } = require("express-validator")
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24}),
    userController.registration)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24}),
    userController.login)
router.post('/logout', userController.logout)
router.get('/activate_account/:link', userController.activate)
router.get('/authenticate_session/:link', userController.authenticateSession)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router