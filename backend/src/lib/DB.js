import mongoose from "mongoose"
import { ENV } from "../lib/env.js"
const connection = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL environment variable is not defined");
        }
        const connectDB = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to DB:", connectDB.connection.host);

    } catch (error) {
        console.log(error.message);

    }
}
export default connection