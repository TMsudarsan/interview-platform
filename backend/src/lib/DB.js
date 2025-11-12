import mongoose from "mongoose"
import {ENV} from "../lib/env.js"
const connection = async ()=>{
    try {
        const connectDB = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to DB:", connectDB.connection.host);
        
    } catch (error) {
        console.log(error.message);
        
    }
}
export default connection