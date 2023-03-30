import mongoose from "mongoose"
const { Schema } = mongoose

const MatchSchema = new Schema({
    donor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    match_percentage: {
        type: Number,
        required: true
    },
    organ:{
        type:String,
        required:true
    },
    hospital_approved: {
        type: Boolean,
        default: true
    },
    recipient_accept: {
        type: Boolean,
        default: false
    },
    donor_accept: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Match", MatchSchema)