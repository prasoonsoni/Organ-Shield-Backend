import express from "express"
import hospitalController from "../controllers/hospitalController.js"
const router = express.Router()

router.get('/donor', hospitalController.getAllDonors)
router.get('/donor/:id', hospitalController.getAllOrgansByDonor)
router.get('/recipient', hospitalController.getAllRecipients)
router.get('/recipient/:id', hospitalController.getAllOrgansByRecipient)
router.get('/organs/donate', hospitalController.getAllOrgansToDonate)

export default router
