import User from './models/user.model.js'
import Role from './models/role.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateAccessToken = (id,roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,"SECRET", {expiresIn: "1h"})
}

class authController{
    async registration(req,res){
        try{
            const {username, password, name, email, gender, phone, BirthMonth, BirthDay,BirthYear} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "User already exist"})
            }
            const birth = new Date(BirthYear,BirthMonth-1,BirthDay)
            const userRole = await Role.findOne({value:"USER"})
            const hashPassword = bcrypt.hashSync(password, 10)
            const user = new User({username, password: hashPassword, name, email, gender, phone, dateOfBirth:birth})
            await user.save()
            res.redirect('/login')
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
    async login(req,res){
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: "User ${username} not found"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: "Incorrect password, try again"})
            }
            const token = generateAccessToken(user._id,user.roles)

            res.cookie('token', token)
            res.redirect('/user')
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }
}
export default new authController()