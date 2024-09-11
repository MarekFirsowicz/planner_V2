
import Employee from '../models/EmployeeModel.js'
import Calendar from '../models/CalendarModel.js'
import { createError } from '../utils/error.js'
import {ObjectId} from 'mongodb'

const lookupPatternWeeklyHours = {
    $lookup: {
        from: "patterns",
        let: { hours: '$shiftHours'},
        localField: "pattern",
        foreignField: "name",
        pipeline:[
            {$project:{
                _id:0,
                rotationHours:{
                    $cond:{
                        if:{ $isArray: "$daysOn" },
                        then: {$multiply:['$$hours',{$size:'$daysOn'}]},
                        else:{$multiply: ['$$hours','$daysOn']}
                    }
                }
            }
                
            },
            
        ],
        as: "weekHours"
    },
    }



export const saveEmployee = async (req, res, next) => {
    const newEmployee = new Employee(req.body)
    try {
        const employee = await Employee.findOne({name:newEmployee.name, surname: newEmployee.surname})
        if(employee){            
            next(createError(409, `Record for ${employee.name} ${employee.surname} already exists (shift: ${employee.shiftName})`))
            return
        }
        const calendars = await Calendar.find({})
        const allowances = {}
        calendars.forEach(el=>{
            const {startCalendar, endCalendar, allowanceAdj}=el
            const mapKey = `${new Date(startCalendar).getFullYear()}/${new Date(endCalendar).getFullYear()}`
            allowances[mapKey]
            allowanceAdj.forEach(item=>{
                allowances[mapKey]={...allowances[mapKey],[item]:0}
            })           
        })
        newEmployee.allowances=allowances
        await newEmployee.save()
        res.status(200).json('Record has been added')
    } catch (err) {
        next(err)
    }
}

export const getEmployee= async (req, res, next)=>{
    try {
        const employee = await Employee.aggregate([
            {$match: {_id: ObjectId(req.params.id)}},
            
            {$project:{username:0, password:0}},
        ])      
        res.status(200).json(employee[0])
    } catch (err) {
        next(err)
    }
}

export const updataEmployee = async(req,res, next)=>{
    try{
        await Employee.findByIdAndUpdate(req.params.id,            
            req.body.comment
            ? 
                req.body.comment&&{
                    $push:{comments:{content:req.body.comment[0], who:`${req.user.name} ${req.user.surname}`,date:req.body.comment[1], when: Date.now()}}
                }

            :{            
            $set:req.body}
        )        
        res.status(200).json('employee record has been updated')
    } catch(err){
        next(err)
    }
}

export const getAllEmployees = async (req, res, next) => {
    const query=req.query.filter||'{}'//{'shiftName':{$in:['B1','E1','B2','B3','E2','E3','D1','D2','D3','A1','A2']}}
    //console.log(req.query)
    
    try {  
        const total = await Employee.countDocuments(JSON.parse(query))
        console.log(req.query)
        const pageNo = parseInt(req.query.page||1)
        const pageSize = parseInt(req.query.limit || 30)
        const skip = (pageNo - 1) * pageSize
        const pages = Math.ceil(total / pageSize)
        const employees = await Employee.aggregate([
            { $match:JSON.parse(query)},  
            lookupPatternWeeklyHours,
            { "$unwind": {
                "path": "$weekHours",
                "preserveNullAndEmptyArrays": true
            } },
            {
                $project: {
                    _id:0,
                    
                    Name: '$name',
                    Surname: '$surname',
                    No: '$employeeNo',
                    Contract: '$contract',
                    Emplr: '$employeer',
                    Start: { $dateToString: { format: "%Y-%m-%d", date: '$startDate' } },
                    Shift: '$shiftName',
                    Pattern: '$pattern',
                    Day: '$shiftHours',
                    Week: { $ifNull: ['$weekHours.rotationHours', 0] },
                    Confirm:{ $ifNull: ['$bookings', []] },
                    //con:{$or:[{$eq:['$bookings.updated','updated']},{$eq:['$bookings.updated','cancelled']},{$eq:['$bookings.confirmed', false]}]},
                    Edit:'$_id',
                }
            },
            {$sort:{Surname:1, Name:1}},
            { $skip: skip },
            { $limit: pageSize },
        ])
        res.status(200).json({
            pagination: {
                pageNo,
                pages,
                total
            },
            employees,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const getReport = async (req, res, next) => {
    const {start,end,filter,...others} = req.query 
    
    const filterParsed = filter?JSON.parse(filter):{}
    const query={$and:[filterParsed,{...others}]}
    try {  
        
        const events = await Employee.distinct('bookings.eventName', query);
      
        const employees = await Employee.aggregate([
            { $match: {...query} },            
            //lookupPatternWeeklyHours,
            //{$unwind:'$weekHours'},
            {
                $project: {
                    password: 0,                    
                }
            },
            {$sort:{surname:1, name:1}},
           
        ])        
        const shifts = await Employee.distinct('shiftName', modifyQuery(filterParsed, 'shiftName'));
        const contracts = await Employee.distinct('contract', query);
        const patterns = await Employee.distinct('pattern', modifyQuery(filterParsed, 'pattern'));
        const employeers = await Employee.distinct('employeer', modifyQuery(filterParsed, 'employeer'));
        const jobs = await Employee.distinct('skills', modifyQuery(filterParsed, 'skills'));
        
           /* const shiftF = await Employee.distinct('shiftName', filterParsed?.contract&&{contract:filterParsed?.contract});
            const shiftQ = await Employee.distinct('shiftName', query);
            const a = shiftF.map(el=>{
                const checkDistinct = shiftQ.includes(el)
                return {name:el, distinct:checkDistinct}})*/
            
        //const a = shifts2()
        //console.log(filterParsed)
        res.status(200).json({            
            employees,
            settings:{shifts:shifts,contracts:contracts, patterns:patterns, employeers:employeers, jobs:jobs, events:events,},
        })
    } catch (err) {
        //console.log(err)
        next(err)
    }
}

function modifyQuery (data, property){
    let {[property]:removed,...rest} = data   
    return rest
}


export const createEvent = async(req,res, next)=>{
    //console.log(req.body.booking)
    try{
        const employee = await Employee.findById(req.params.id)
        const checkEvents = compareArrayofObjetcs(req.body.bookings, employee.bookings)
        if(checkEvents){            
            return next(createError(409, 'One ore more days alread have been booked. Please refresh Browser and try again'))
        }
        employee.bookings.push(...req.body.bookings)       
        await employee.save()
        
        res.status(200).json('events has been created')
    } catch(err){
        console.log(err)
        next(err)
    }
}

export const updateEvent = async(req,res, next)=>{
    try{
        await Employee.updateOne({"bookings._id":req.params.id},     
        req.body.cancelled?
        {$pull:
            {bookings:{_id:req.params.id}}
        }
        :{$set:{ 'bookings.$.hours':req.body.hours,
                'bookings.$.bookingType':req.body.bookingType,
                'bookings.$.updated':req.body.updated,
                'bookings.$.eventName':req.body.eventName
        }})        
        res.status(200).json('Event has been updated')
    } catch(err){
        next(err)
    }
}



export const confirmManyEvents = async(req,res, next)=>{
    try{
        await Employee.findByIdAndUpdate(req.params.id,            
        {$set:{ 
                'bookings.$[el].confirmed':true,  
                'bookings.$[el].confirmedBy':`${req.user.name} ${req.user.surname}`,                
        }},
        {arrayFilters: [{'el._id':{$in:req.body}}]}
        )        
        res.status(200).json('Event has been updated')
    } catch(err){
        next(err)
    }
}


export const deleteComments = async(req,res, next)=>{
    try{
        await Employee.updateOne({"comments._id":req.params.id}, 
        {$pull:
            {comments:{_id:req.params.id}}
        }
        )        
        res.status(200).json('Comments have been deleted')
    } catch(err){
        next(err)
    }
}



//functions
function setMidnight(date){
    return new Date(date).setHours(0,0,0,0)
}

function compareArrayofObjetcs(arr1, arr2){
    return (
        arr1.some((newEvent) => 
                    arr2.some((savedEvent)=>
                    setMidnight(newEvent.date)===setMidnight(savedEvent.date)&&(savedEvent.bookingType==='fullDay'
                    ||savedEvent.bookingType===newEvent.bookingType
                    ||newEvent.bookingType==='fullDay'
                    )&&savedEvent.updated!=='cancelled'        

            ))
    )
}


function convertBooleanStringsToBooleans(obj) {
    const parseBoolean = (value) => {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
      return value;
    };
  
    const result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
        result[key] = convertBooleanStringsToBooleans(obj[key]); // Recursively convert nested objects
        } else if (Array.isArray(obj[key])) {
        result[key] = obj[key].map((item) => convertBooleanStringsToBooleans(item)); // Convert boolean strings in arrays of objects
        } else {
        result[key] = parseBoolean(obj[key]);
        }
    }
  
    return result;
  }