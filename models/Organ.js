import mongoose from "mongoose"
const { Schema } = mongoose

const OrganSchema = new Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
        required: true
    },
    organ_type: {
        type: String,
        required: true
    },
    ethnic: {
        type: String
    },
    bmi: {
        type: String
    },
    lod: {
        type: String
    }
})

export default mongoose.model('Organ', OrganSchema)