const Router = require("express").Router
const { body } = require("express-validator")
const authController = require('../controllers/authController')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24}),
    authController.registration)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24}),
    authController.login)
router.post('/logout', authController.logout)
router.get('/activate_account/:link', authController.activate)
router.get('/authenticate_session/:link', authController.authenticateSession)
router.get('/refresh', authController.refresh)

module.exports = router