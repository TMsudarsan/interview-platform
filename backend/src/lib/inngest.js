import { Inngest } from "inngest";
import connection from "./DB.js";
import User from "../model/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
                       
export const inngest = new Inngest({ id: "interview-platform" });

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event}) =>{
        await connection()

        const {id,email_addresses,first_name,last_name,image_url} = event.data

        const newuser = {
            clerkId:id,
            email:email_addresses[0]?.email_address,
            name:`${first_name || ""} ${last_name || ""}`,
            profileImage:image_url
        }
        await User.create(newuser)

        await upsertStreamUser({
            id: newuser.clerkId.toString(),
            name:newuser.name,
            image:newuser.profileImage
        })
    }
)
const deleteUserfromDB = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({event}) =>{
        await connection()

        const {id} = event.data

        await User.deleteOne({clerkId: id })
        await deleteStreamUser(id.toString())
    }
) 
export const functions  = [syncUser,deleteUserfromDB]