import User from "../models/User.js"
import Organ from "../models/Organ.js"
import Match from "../models/Match.js"
import { ObjectId } from "mongodb"

const addOrgan = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.id)
        const user = await User.findOne({ _id: user_id })
        const { organ_type, bmi, lod, ethnic } = req.body
        const organ = await Organ.create({
            organ_type, bmi, lod, ethnic, user_id, blood_group: user.blood_group, user_type: user.type
        })
        if (!organ) {
            return res.json({ success: false, message: "Error Adding Organ" })
        }
        return res.json({ success: true, message: "Organ Added Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const deleteOrgan = async (req, res) => {
    try {
        const organ_id = new ObjectId(req.params.id)
        const user_id = new ObjectId(req.user.id)
        const organ = await Organ.findOne({ _id: organ_id })
        if (!organ) {
            return res.json({ success: false, message: "Organ Not Found" })
        }
        if (organ.user_id != req.user.id) {
            return res.json({ success: false, message: "Access Denied" })
        }
        const deleteOrgan = await Organ.deleteOne({ _id: organ_id })
        if (!deleteOrgan.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Record" })
        }
        return res.json({ success: true, message: "Record Deleted Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getOrgans = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.id)
        const organs = await Organ.find({ user_id: user_id })
        return res.json({ success: true, message: "Organs Found", data: organs })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getMatchedDonors = async (req, res) => {
    try {
        const match = await Match.find({ recipient_id: new ObjectId(req.user.id) })
        return res.json({ success: true, message: "Matches Found Successfully", data: match })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const acceptMatch = async (req, res) => {
    try {
        const match = await Match.updateOne({ recipient_id: new ObjectId(req.user.id) }, { $set: { recipient_accept: true } })
        if (!match.acknowledged) {
            return res.json({ success: false, message: "Error Accepting" })
        }
        return res.json({ success: true, message: "Accepted Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}
export default { addOrgan, deleteOrgan, getOrgans, getMatchedDonors, acceptMatch }
