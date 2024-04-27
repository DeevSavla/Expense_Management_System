import express from 'express'
import { loginController, registerController } from '../controllers/user.controller'

export const userRouter = express.Router()

userRouter.post('/login',loginController)
userRouter.post('/register',registerController)
