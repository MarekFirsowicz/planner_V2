import mongoose from 'mongoose'
const event = './EventModel.js'

const EmployeeSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        lowercase: true,
        unique:true,
        sparse: true,
        trim: true,
    },
    employeer:{
        type: String,
        required: true,
        uppercase: true
    },
    phone: {
        type: Number,
        trim: true,
        default:null,
    },
    password: {
        trim: true,
        type: String,
        default:null,
    },
    accessLvl:{
        trim: true,
        type:Number,
        default: 0,
    },
    shiftsEdit: {
        trim: true,
        type: Array,
        uppercase: true,
    },

    employeeNo: {
        type: Number,
        trim: true,
        default:'',
    },
    startDate: {
        type: Date,
        required: true
    },
    contract: {
        type: String,
        required: true,
        uppercase: true,
    },
    shiftName: {
        type: String,
        required: true,
        uppercase: true,
    },
    pattern: {
        type: String,
        required: true,
        uppercase: true,
    },
    shiftHours: {
        type: Number,
        required: true,
        trim: true,
    },
    allowances:{
        type: Map,
        of:Object,
    },
    comments:[{
        content:{
            type:String,
            trim:true,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        who:{
            type:String
        },
        when:{
            type:Date
        }
    }],
    skills:[{type: String, uppercase: true}],
    bookings:{
        type:[{
        eventName: {
            type: String,
            required:true
        },
        bookedBy: {
            type: String,
            //required: true
        },
        when:{
            type:Date,
            //required:true
        },

        confirmed: {
            type: Boolean,
            default: false,
        },
        updated: {
            type:String,
            default: null,
        },
        confirmedBy: {
            type: String,
            default:null
        },
        date:{
            type:Date,
            required:true
        },
        bookingType:{
            type:String,
            required:true
        },
        hours:{
            type:Number,
            required:true
        },        
    }],
    default:[]
    }
    
})

EmployeeSchema.index({name:1, surname:1}, {unique: true});
export default mongoose.model("employee", EmployeeSchema)