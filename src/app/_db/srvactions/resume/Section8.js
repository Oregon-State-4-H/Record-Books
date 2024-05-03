"use server"

import { Section8 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection8(docId) {
    try {
        const db = await connectDB();
        const section = await Section8.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection8:", error);
        Error(error);
    }
}

export async function getSection8Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section8.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection8Docs:", error);
        Error(error);
    }
}

export async function addSection8(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

try {
        const db = await connectDB();
        const section = new Section8({
            uid: userID,
            year: formData.get("year"),
            individualGroupActivities: formData.get("individualGroupActivities"),
            hoursSpent: formData.get("hoursSpent"),
            numPeopleReached: formData.get("numPeopleReached")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection8:", error);
        Error(error);
    }
}