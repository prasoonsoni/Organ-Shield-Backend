import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const getUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.json({ success: false, message: "Authentication token is required." })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
        res.json({ success: false, message: "Authentication token is not valid." })
        console.log(error.message)
    }
}

export default getUser