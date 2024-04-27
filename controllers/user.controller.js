import {user} from '../models/user.model'

const loginController=async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await user.findOne({email},{password})
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch(error){
        res.status(400).json({
            success:false,
            error:'Cannot log in properly'
        })
    }
}

const registerController = async (req,res)=>{
    try{
        const newUser =new user(req.body)
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser
        })
    } catch(error){
        res.status(400).json({
            success:false,
            error:'Registration failed'
        })
    }
}

export {
    loginController,
    registerController,

}