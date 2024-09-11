import Contract from '../models/ContractModel.js'
import { createError } from '../utils/error.js'


export const getContractByName = async (req, res, next)=>{
    try {
        const contracts = await Contract.findOne({'name':req.query.name})
        const {shifts, ...other} = contracts
        res.status(200).json(shifts)
    } catch (err) {
        next(err)
    }
}

export const createContract = async(req, res, next)=>{
    const newContract = new Contract(req.body)
    try{
        await newContract.save()
        res.status(200).json('Contract was created')
    } catch(err){
        next(err)
    }
}


export const getAllContracts = async (req, res, next)=>{
    try {
        const contracts = await Contract.find()
        res.status(200).json(contracts)
    } catch (err) {
        next(err)
    }
}

export const getContract =  async(req, res, next)=>{  
    try{
        const contract = await Contract.findById(req.params.id)
        res.status(200).json(contract)
    } catch(err){
        next(err)
    }
}

export const updateContract = async(req, res, next)=>{   
    const [key] = Object.keys(req.body)
    const [value] = Object.values(req.body)
    try{
        await Contract.findByIdAndUpdate(req.params.id,{
            $addToSet:{[key]:value}
        })
        res.status(200).json('Contract updated')
    } catch(err){
        next(err)
    }
}

export const updateContractRemove = async(req, res, next)=>{   
    const [key] = Object.keys(req.body)
    const [value] = Object.values(req.body)
    try{
        await Contract.findByIdAndUpdate(req.params.id,{
            $pull: {[key]:value}
        })
        res.status(200).json('Contract updated')
    } catch(err){
        next(err)
    }
}

export const deleteContract = async(req, res, next)=>{        
    try{
        await Contract.findByIdAndDelete(req.params.id)
        res.status(200).json('Record was deleted')
    } catch(err){
        next(err)
    }
}