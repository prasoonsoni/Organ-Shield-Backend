import express from "express"
import organController from "../controllers/organController.js"
import getUser from "../middleware/getUser.js"
const router = express.Router()

router.post('/add', getUser, organController.addOrgan)

export default router
