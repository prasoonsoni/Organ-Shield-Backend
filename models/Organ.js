import mongoose from "mongoose"
const { Schema } = mongoose

const OrganSchema = new Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
        required: true
    },
    user_type: {
        type: String,
        ref: 'User',
        required: true
    },
    organ_type: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    ethnic: {
        type: String,
        required: true
    },
    bmi: {
        type: String,
        required: true
    },
    lod: {
        type: String,
        required: true
    }
})

export default mongoose.model('Organ', OrganSchema)