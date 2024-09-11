import Calendar from '../models/CalendarModel.js'
import Employee from '../models/EmployeeModel.js'

import { createError } from '../utils/error.js'
export const getAllCalendars = async (req, res, next)=>{
    try {
        const calendars = await Calendar.find().sort({startCalendar:1})
        res.status(200).json(calendars)
    } catch (err) {
        next(err)
    }
}

export const createCalendar =  async(req, res, next)=>{
    const newCalendar = new Calendar(req.body)
    const year = new Date (req.body.startCalendar).getFullYear()
    const date =year+'/'+(parseInt(year)+1)
    try{    
        //const calendar = await Calendar.findOneAndUpdate({startCalendar:req.body.startCalendar},{...newCalendar} ,{upsert:true})
        const calendar = await Calendar.findOne({$expr:{
            $eq:[{$year:'$startCalendar'},year]
        }})
        if(calendar){            
            return next(createError(409, `Calendar for ${calendar.startCalendar.getFullYear()} already exists`))
        }
        const savedCalendar = await newCalendar.save();
        if(savedCalendar){
            await Employee.updateMany({}, [{$set:{allowances:{[date]:{'base':0}} } }],{'multi':true})
        }
        res.status(200).json('New Calendar created')
    } catch(err){
        /*if(err?.code===66){
            return next(createError(409, 'record Exist'))
        }   */     
        next(err)
    }
}


export const getCalendar =  async(req, res, next)=>{  
    try{
        const calendar = await Calendar.findById(req.params.id)
        res.status(200).json(calendar)
    } catch(err){
        next(err)
    }
}


export const updateCalendar = async(req, res, next)=>{ 
    //console.log(req.body)
    try{
        
        if(req.body.allowanceAdj){            
            const calendar =await Calendar.findOneAndUpdate({_id:req.params.id, allowanceAdj:{$nin:[req.body.allowanceAdj]}}, {$push:{allowanceAdj:req.body.allowanceAdj}} )
            if(calendar){
                const year = new Date(calendar.startCalendar).getFullYear()
                const date = `${year}/${parseInt(year)+1}`
                await Employee.updateMany({}, [{$set:{allowances:{[date]:{[req.body.allowanceAdj]:0}} } }],{'multi':true})
            }
        }else if(req.body.allowanceAdjRemove){
            const calendar = await Calendar.findByIdAndUpdate(req.params.id,{
                $pull: {allowanceAdj:req.body.allowanceAdjRemove}
                })
                if(calendar){
                const year = new Date(calendar.startCalendar).getFullYear()
                const prop = `allowances.${year}/${parseInt(year)+1}.${req.body.allowanceAdjRemove}`
                await Employee.updateMany({}, {$unset:{[prop]:''}  },{'multi':true})}
        }        
        else{
            await Calendar.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })        
        }
        res.status(200).json('Calendar Updated')
    } catch(err){
        next(err)
    }
}


export const deleteCalendar = async(req, res, next)=>{  
    try{
        const calendar = await Calendar.findByIdAndDelete(req.params.id)
        const year = new Date(calendar.startCalendar).getFullYear()
        const prop = `allowances.${year}/${parseInt(year)+1}`
        if(calendar){
            await Employee.updateMany({}, {$unset:{[prop]:''}  },{'multi':true})
        }
        res.status(200).json('Record was deleted')
    } catch(err){
        next(err)
    }
}