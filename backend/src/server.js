import express from 'express';
import { ENV } from './lib/env.js';
import path from "path"
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

app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${ENV.PORT} `);
    
})