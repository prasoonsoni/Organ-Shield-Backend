import express from "express"
import hospitalController from "../controllers/hospitalController.js"
const router = express.Router()

router.get('/donor', hospitalController.getAllDonors)

export default router
