//importing packages
import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import colors from 'cors'
import { connectDB } from './config/connectdb.js'

//rest object
const app = express();

//config 
config()

//database connection
connectDB()

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Hello from server</h1>');
})

//initialise port
const PORT = 8080 || process.env.PORT

//listen
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})