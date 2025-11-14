import {  requireAuth } from '@clerk/express'
import User from '../model/user.model.js'

export  const protectRoute = [
    requireAuth({signInUrl : "/signIn"}),
    async (req,res,next) =>{
        try {
            const clerkId = req.auth().userId

            if(!clerkId) return res.status(401).json({mes:"Unauthorized - invaild token"})

            const user = await User.findOne({clerkId})

            if(!user) return  res.status(404).json({msg:"User not found"})

                req.user = user

                next()
        } catch (error) {
            console.error("Error in protectRoute",error.message);
            res.status(500).json({msg:"internal server error"})
            
        }
    }
]