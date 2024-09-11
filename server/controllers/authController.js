import employee from '../models/EmployeeModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5d' })
}

//Register
/*
router.post('/register', async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            password: hashedPass,
            contract: req.body.contract,
            shifts: req.body.shifts,
            accessLvl: req.body.accessLvl
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})
*/

//Login
export const login = async (req, res, next) => {
    try {
        const user = await employee.findOne({ username: req.body.username })
        if (!user) { return next(createError(401, 'You are not authorized')) }

        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) { return next(createError(401, 'You are not authorized')) }

        const { accessLvl, _id, username, contract, shiftsEdit, name, surname, shiftName,...others } = user._doc
        const token = createToken(user._id)
        const userData = { accessLvl, _id, shiftName, contract, username, name, surname, token }
        
        res.status(200).json(userData)
    } catch (err) {
        next(err)
    }
}



