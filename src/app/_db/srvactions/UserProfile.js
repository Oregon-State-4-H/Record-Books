"use server"

import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";

export async function getUserProfile(uid) {
    try {
        const db = await connectDB();
        const user = await User.findOne({ _id: uid });
        console.log("useDoc:", user);
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("getUserProfile:", error);
    }
}