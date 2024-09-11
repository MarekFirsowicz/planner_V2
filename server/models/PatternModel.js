import mongoose from 'mongoose'

const PatternSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
        trim: true,
    },
    type: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    daysOn: {
        
    },
    daysOff: {
        
    },
    pattern: {
        type: String,
        required: true
    },
})

export default mongoose.model("pattern", PatternSchema)