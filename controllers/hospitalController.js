import { ObjectId } from "mongodb"
import Organ from "../models/Organ.js"
import User from "../models/User.js"

const getAllDonors = async (req, res) => {
    try {
        const donors = await User.find({ type: "donor" })
        return res.json({ success: true, message: "Donors Found", data: donors })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllRecipients = async (req, res) => {
    try {
        const donors = await User.find({ type: "recipient" })
        return res.json({ success: true, message: "Recipients Found", data: donors })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllOrgansByDonor = async (req, res) => {
    try {
        const user_id = new ObjectId(req.params.id)
        const organs = await Organ.find({ user_id: user_id })
        return res.json({ success: true, message: "Organs Found Successfully", data: organs })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllOrgansByRecipient = async (req, res) => {
    try {
        const user_id = new ObjectId(req.params.id)
        const organs = await Organ.find({ user_id: user_id })
        return res.json({ success: true, message: "Organs Found Successfully", data: organs })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllOrgansToDonate = async (req, res) => {
    try {
        const organs = await Organ.find({ user_type: "donor" })
        return res.json({ success: true, message: "Organs Find Successfully", data: organs })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllOrgansToReceive = async (req, res) => {
    try {
        const organs = await Organ.find({ user_type: "recipient" })
        return res.json({ success: true, message: "Organs Find Successfully", data: organs })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}
export default { getAllDonors, getAllRecipients, getAllOrgansByDonor, getAllOrgansByRecipient, getAllOrgansToDonate, getAllOrgansToReceive }