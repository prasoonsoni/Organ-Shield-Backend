import express from "express"
import organController from "../controllers/organController.js"
import getUser from "../middleware/getUser.js"
const router = express.Router()

router.get('/', getUser, organController.getOrgans)
router.post('/add', getUser, organController.addOrgan)
router.delete('/delete/:id', getUser, organController.deleteOrgan)

export default router
