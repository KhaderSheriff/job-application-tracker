
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import connectDB from "../db";

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db("job-board");

export const auth = betterAuth({
    database: mongodbAdapter(db ,{
        client,
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60
        }
    },
    emailAndPassword: { 
        enabled: true, 
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    if(user.id) {
                        await initializeUserBoard(user.id);
                    }
                },
            },
        },
    },
});

export async function getSession() {
    //present in better auth doc
    const result = await auth.api.getSession({
        headers: await headers()
    });
    return result;
}

export async function signOut() {
    const result = await auth.api.signOut({
        headers: await headers()
    });
    if(result.success){
        redirect("/sign-in");
    }
}