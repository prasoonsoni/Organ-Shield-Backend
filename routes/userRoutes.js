import express from "express"
import userController from "../controllers/userController.js"
import getUser from "../middleware/getUser.js"
const router = express.Router()

router.get('/', getUser, userController.getUser)
router.post('/create', userController.createUser)
router.post('/login', userController.login)

export default router
