import Organ from "../models/Organ.js"
import User from "../models/User.js"

const getAllDonors = async (req, res) => {
    try {
        const donors = await User.find({ type: "donor" })
        return res.json({ status: true, message: "Donors Found", data: donors })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: "Internal Server Error Occurred" })
    }
}

const getAllRecipients = async (req, res) => {
    try {
        const donors = await User.find({ type: "recipient" })
        return res.json({ status: true, message: "Recipients Found", data: donors })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: "Internal Server Error Occurred" })
    }
}

export default { getAllDonors, getAllRecipients }