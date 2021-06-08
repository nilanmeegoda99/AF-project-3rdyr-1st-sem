import express from 'express'
import { getUserAccount, addUser, updateUserAccount, getUsers} from '../controllers/userController.js'
const router = express.Router()


router.route('/').post(addUser).get(getUsers)