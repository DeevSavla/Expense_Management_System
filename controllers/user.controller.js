import { user } from '../models/user.model.js'

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await user.findOne({email})
        if (!findUser) {
            return res.status(404).send('User not found')
        }
        res.status(200).json({
            success: true,
            findUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Cannot log in properly'
        })
    }
}

const registerController = async (req, res) => {
    try {
        const newUser = new user(req.body);
        await newUser.save();
        res.status(201).json({ success: true, newUser });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
}


export {
    loginController,
    registerController,
}