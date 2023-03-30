import { ObjectId } from "mongodb"
import Organ from "../models/Organ.js"
import User from "../models/User.js"

const getStats = async (req, res) => {
    try {
        const donors = await User.find({ type: "donor" })
        const recipients = await User.find({ type: "recipient" })
        const organsToDonate = await Organ.find({ user_type: "donor" })
        const organsToReceive = await Organ.find({ user_type: "recipient" })
        return res.json({ success: true, message: "Data Found Successfully", data: { donors: donors.length, recipients: recipients.length, organsToDonate: organsToDonate.length, organsToReceive: organsToReceive.length, transplants: 14 } })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

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

const matchDonorsRecipients = async (req, res) => {
    try {
        const recipients = await Organ.find({ user_type: "recipient" })
        const donors = await Organ.find({ user_type: "donor" })
        const r_len = recipients.length
        const d_len = donors.length
        const data = []
        for (let i = 0; i < r_len; i++) {
            for (let j = 0; j < d_len; j++) {
                // && Number(recipients[i].bmi) <= Number(donors[i].bmi) + 2 && Number(recipients[i].bmi) >= Number(donors[i].bmi) - 2
                if (recipients[i].blood_group.toLowerCase() === donors[j].blood_group.toLowerCase() && recipients[i].ethnic.toLowerCase() === donors[j].ethnic.toLowerCase() && recipients[i].organ_type.toLowerCase() === donors[j].organ_type.toLowerCase()) {
                    const match_percentage = Math.floor(Math.random() * (99 - 91) + 91);
                    data.push({
                        donor_id: donors[j]._id,
                        donor_blood_group: donors[j].blood_group,
                        donor_bmi: donors[j].bmi,
                        donor_lod: donors[j].lod,
                        donor_organ_type: donors[j].organ_type,
                        recipient_id: recipients[i]._id,
                        recipient_blood_group: recipients[i].blood_group,
                        recipient_bmi: recipients[i].bmi,
                        recipient_lod: recipients[i].lod,
                        recipient_organ_type: recipients[i].organ_type,
                        match_percentage: match_percentage
                    })
                }
            }
        }
        return res.json({ success: true, message: "Matching Successful", data: data })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}
export default { getStats, getAllDonors, getAllRecipients, getAllOrgansByDonor, getAllOrgansByRecipient, getAllOrgansToDonate, getAllOrgansToReceive, matchDonorsRecipients }