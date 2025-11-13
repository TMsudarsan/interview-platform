import { Inngest } from "inngest";
import connection from "./DB.js";
import User from "../model/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "interview-platform" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connection()

        const { id, email_addresses, first_name, last_name, image_url } = event.data

        const newuser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }
        await User.create(newuser)

        try {
            await upsertStreamUser({
                id: newuser.clerkId.toString(),
                name: newuser.name,
                image: newuser.profileImage
            })
        } catch (error) {
            console.error("Failed to sync user to Stream, rolling back DB creation", error);
            await User.deleteOne({ clerkId: newuser.clerkId });
            throw error;
        }
    }
)
const deleteUserfromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connection()

        const { id } = event.data

        await User.deleteOne({ clerkId: id })
        try {
            await deleteStreamUser(id.toString())
        } catch (error) {
            console.error("Failed to delete user from Stream - orphaned user may exist", { userId: id.toString(), error });
            // Consider whether to throw here or just log
        }
    }
)
export const functions = [syncUser, deleteUserfromDB]