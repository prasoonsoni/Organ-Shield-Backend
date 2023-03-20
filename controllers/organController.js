import User from "../models/User.js"
import Organ from "../models/Organ.js"
import { ObjectId } from "mongodb"

const addOrgan = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.id)
        const user = await User.findOne({ _id: user_id })
        const { organ_type, bmi, lod, ethnic } = req.body
        const organ = await Organ.create({
            organ_type, bmi, lod, ethnic, user_id, blood_group: user.blood_group
        })
        if (!organ) {
            return res.json({ success: false, message: "Error Adding Organ" })
        }
        return res.json({ success: true, message: "Organ Added Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: "Internal Server Error Occurred" })
    }
}

export default { addOrgan }
