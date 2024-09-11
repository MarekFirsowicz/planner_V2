import mongoose from 'mongoose'


const CalendarSchema = new mongoose.Schema({
    
    startCalendar: {
        type: Date,
        required: true,
    },
    endCalendar: {
        type: Date,
        required: true,
    },
    startClipperWeeks: {
        type: Date,
        required: true,
    },
    weekNo: {
        type: Number,
        required: true,
        trim: true,
    },
    allowanceAdj:{        
        type:[{
            type:String,
            trim: true,
            lowercase:true,
            }],
        default:['base']
    },
    weeklyAllowance:{
        type:[Number],
    }
})

export default mongoose.model("calendar", CalendarSchema)