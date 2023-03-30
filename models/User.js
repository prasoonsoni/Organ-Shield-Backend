import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["donor", "recipient"]
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "m", "f", "M", "F", "Male", "Female"],
        required: true
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)