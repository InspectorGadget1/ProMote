import {Router} from 'express'
const router = new Router()
import auth from '../authController.js'


router.post('/registration', auth.registration)
router.post('/login', auth.login)


export default router