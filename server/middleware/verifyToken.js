import jwt from 'jsonwebtoken'
import employee from '../models/EmployeeModel.js'
import { createError } from '../utils/error.js'


export const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return next(createError(401, 'You are not authenticated'))
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await employee.findOne({ _id }).select({ accessLvl: 1, name:1, surname:1 })
        if (req.user.accessLvl > 1) {
            next()
        } else {
            return next(createError(401, 'You are not authorized'))
        }
        //next()
    } catch (err) {
        return next(createError(401, 'You are not authorized'))
    }
}

export const verifyAccessGt2 = (req, res, next) => {
    if (req.user.accessLvl > 2) {
        next()
    } else {
        return next(createError(401, 'You are not authorized'))
    }
    //next()
}

export const verifyAccessGt3 = (req, res, next) => {
    if (req.user.accessLvl > 7) {
        next()
    } else {
        return next(createError(401, 'You are not authorized'))
    }
    //next()
}