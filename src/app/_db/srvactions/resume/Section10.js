"use server"

import { Section10 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection10(docId) {
    try {
        const db = await connectDB();
        const section = await Section10.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection10:", error);
        Error(error);
    }
}

export async function getSection10Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section10.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection10Docs:", error);
        Error(error);
    }
}

export async function addSection10(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    
    try {
        const db = await connectDB();
        const section = new Section10({
            uid: userID,
            year: formData.get("year"),
            communicationType: formData.get("communicationType"),
            topic: formData.get("topic"),
            timesGiven: formData.get("timesGiven"),
            location: formData.get("location"),
            audienceSize: formData.get("audienceSize")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection10:", error);
        Error(error);
    }
}