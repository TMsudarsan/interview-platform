import { chatClient } from "../lib/stream.js"

export const getStreamToken = (req,res) =>{
    try {
        const Token = chatClient.createToken(req.user.clerkId);

        res.status(200).json({
            Token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        })
    } catch (error) {
        console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}