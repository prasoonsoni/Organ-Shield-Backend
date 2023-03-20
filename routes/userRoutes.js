import express from "express"
import userController from "../controllers/userController.js"
const router = express.Router()

router.post('/create', userController.createUser)
router.post('/login', userController.login)

export default router
