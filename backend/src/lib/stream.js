import {StreamChat} from "stream-chat"
import { ENV } from "./env"

const apikey = ENV.STREAM_API_KEY;
const apisecret = ENV.STREAM_API_SECRET

if(!apikey || !apisecret){
    console.log("missing apikeys in stream-chat");
}

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
        console.log("error in stream deleting userId", error.message);
    }
}