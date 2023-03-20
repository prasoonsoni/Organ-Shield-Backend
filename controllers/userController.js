import User from "../models/User.js"
import bcrypt from "bcrypt"
const createUser = async (req, res) => {
    try {
        const { name, email, password, type, address, blood_group } = req.body
        const alreadyPresent = await User.findOne({ email })
        if (alreadyPresent) {
            return res.json({ status: false, message: "User Already Exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password:securedPassword, type, address, blood_group })
        if (!user) {
            return res.json({ status: false, message: "Error Creating User. Try Again!" })
        }
        return res.json({ status: true, message: "Account Created Successfully." })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: "Internal Server Error Occurred" })
    }
}

export default { createUser }