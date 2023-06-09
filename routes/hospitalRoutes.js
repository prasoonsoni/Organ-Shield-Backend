import express from "express"
import hospitalController from "../controllers/hospitalController.js"
const router = express.Router()

router.get('/', hospitalController.getStats)
router.get('/donor', hospitalController.getAllDonors)
router.get('/donor/:id', hospitalController.getAllOrgansByDonor)
router.get('/recipient', hospitalController.getAllRecipients)
router.get('/recipient/:id', hospitalController.getAllOrgansByRecipient)
router.get('/organs/donate', hospitalController.getAllOrgansToDonate)
router.get('/organs/receive', hospitalController.getAllOrgansToReceive)
router.get('/match', hospitalController.matchDonorsRecipients)
router.post('/match/approve', hospitalController.approveMatch)
router.get('/transplants', hospitalController.getSuccessfulTransplants)

export default router
