import User from "../models/User.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

const getUser = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findOne({ _id: id }).select('-password')
        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
        }
        return res.json({ success: false, message: "User Found", data: user })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, type, address, blood_group, age, gender } = req.body
        const alreadyPresent = await User.findOne({ email })
        if (alreadyPresent) {
            return res.json({ success: false, message: "User Already Exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: securedPassword, type, address, blood_group, age, gender })
        if (!user) {
            return res.json({ success: false, message: "Error Creating User. Try Again!" })
        }
        return res.json({ success: true, message: "Account Created Successfully." })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password, type } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "Account Not Found." })
        }
        const salt = await bcrypt.genSalt(10)
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.json({ success: false, message: "Incorrect Password" })
        }
        const data = { user: { id: user._id } }
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY)
        return res.json({ success: true, message: "Logged in Successfully", data: { token: token, type: user.type } })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}


export default { getUser, createUser, login }