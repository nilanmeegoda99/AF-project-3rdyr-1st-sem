import express from 'express'
import { getUserAccount, createUser, updateUserAccount, getUsers, authUser} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()


router.route('/').post(createUser).get(getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserAccount)

export default router