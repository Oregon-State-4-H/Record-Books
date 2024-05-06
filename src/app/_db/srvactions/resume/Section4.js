"use server"

import { Section4 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection4(docId) {
    try {
        const db = await connectDB();
        const section = await Section4.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection4:", error);
        Error(error);
    }
}

export async function getSection4Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }

        const sections = await Section4.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection4Docs:", error);
        Error(error);
    }
}

export async function addSection4(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    
    try {
        const db = await connectDB();
        const section = new Section4({
            uid: userID,
            year: formData.get("year"),
            activityKind: formData.get("activityKind"),
            scope: formData.get("scope"),
            level: formData.get("level")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection4:", error);
        Error(error);
    }
}