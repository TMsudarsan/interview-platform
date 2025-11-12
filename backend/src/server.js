import express from 'express';
import { ENV } from './lib/env.js';
import path from "path"
import connection from './lib/DB.js';
 const app = express()

 const __dirname = path.resolve()
 
app.get("/api",(req, res)=>{ 
    res.send("message to api")
})

// make sure this is in production
if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

const startServer = async ()=>{
    await connection()
app.listen(ENV.PORT,()=>    console.log(`server is running in the port http://localhost:${ENV.PORT} `))}
startServer()