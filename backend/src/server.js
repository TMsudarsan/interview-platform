import express from 'express';
import { ENV } from './lib/env.js';
import path from "path"
import connection from './lib/DB.js';
import cors from "cors"
import {serve} from "inngest/express"
import { inngest ,functions} from './lib/inngest.js';
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRoute from './routes/chatRoute.js';
import sessionRoute from './routes/sessionRoute.js';

  const app = express()

 const __dirname = path.resolve();

 app.use(express.json());
 app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
 app.use(clerkMiddleware())

 app.use("/api/inngest", serve({client: inngest,functions}))
 app.use('/api/chat', chatRoute)
 app.use('/api/sessions', sessionRoute)
 
app.get("/vide",protectRoute,(req, res)=>{
    res.send("message to api")
});

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