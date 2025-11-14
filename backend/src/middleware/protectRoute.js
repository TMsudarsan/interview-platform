import {  requireAuth } from '@clerk/express'
import User from '../model/user.model.js'

export  const protectRoute = [
    requireAuth({signInUrl : "/signIn"}),
    async (req,res,next) =>{
        try {
            const clerkId = req.auth().userId

            if(!clerkId) return res.status(401).json({message:"Unauthorized - invaild token"})

            const user = await User.findOne({clerkId})

            if(!user) return  res.status(404).json({message:"User not found"})

                req.user = user

                next()
        } catch (error) {
            console.error("Error in protectRoute",error.message);
            res.status(500).json({message:"internal server error"})
            
        }
    }
]