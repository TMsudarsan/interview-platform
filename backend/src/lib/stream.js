import {StreamChat} from "stream-chat"
import {ENV} from "../lib/env.js"
import {StreamClient} from "@stream-io/node-sdk"

const apikey = ENV.STREAM_API_KEY;
const apisecret = ENV.STREAM_API_SECRET

if(!apikey || !apisecret){
    throw new Error("STREAM_API_KEY and STREAM_API_SECRET must be configured");
}

export const streamClient =  new StreamClient(apikey,apisecret)
export const chatClient = StreamChat.getInstance(apikey,apisecret);

export const upsertStreamUser = async (userData)=>{
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream updated the user data:",userData);
        
    } catch (error) {
        console.log("error upserting stream user", error.message);
    }
}
export const deleteStreamUser = async (userId)=>{
    try {
        await chatClient.deleteUser(userId)
        console.log("stream deleted user using UserId:",userId);
        
    } catch (error) {
        console.error("Error deleting stream user:", userId, error.message);
    }
}