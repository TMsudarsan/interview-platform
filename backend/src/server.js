import express from 'express';
import { ENV } from './lib/env.js';
 const app = express()

app.get("/",(req, res)=>{ 
    res.send("message to api")
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${ENV.PORT} `);
    
})