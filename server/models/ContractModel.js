import mongoose from 'mongoose'

const ContractSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true,
        trim: true,
        unique: true,
    },
    shifts:[{type: String, uppercase: true, trim:true}],
    skills:[{type: String, uppercase: true, trim:true}],
    agency:[{type: String, uppercase: true, trim:true}],
})

export default mongoose.model("contract", ContractSchema)