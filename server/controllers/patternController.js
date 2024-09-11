import Pattern from '../models/PatternModel.js'
import { createError } from '../utils/error.js'


//Get all

export const getAllPatterns = async (req, res, next)=>{
    try {
        const patterns = await Pattern.find().sort('name')
        res.status(200).json(patterns)
    } catch (err) {
        next(err)
    }
}



export const createPattern = async(req, res, next)=>{
    const newPattern = new Pattern(req.body)
    try{
        await newPattern.save()
        res.status(200).json('Pattern has been created')
    } catch(err){
        next(err)
    }
}

export const deletePattern = async(req, res, next)=>{        
    try{
        await Pattern.findByIdAndDelete(req.params.id)
        res.status(200).json('Record was deleted')
    } catch(err){
        next(err)
    }
}