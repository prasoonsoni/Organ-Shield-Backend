import mongoose from "mongoose"
const { Schema } = mongoose

const MatchSchema = new Schema({
    donor_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    approved: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Match", MatchSchema)