import mongoose from "mongoose"

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Server ruuning on ${mongoose.connection.host}`)
    } catch(error){
        console.log(error)
    }
}
