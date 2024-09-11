const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    who: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true
    },
    content:{
        required:true,
        type: Object,
    },
    
},{timestamps:true})

module.exports = mongoose.model("log", LogSchema)