"use server"

import { Section9 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection9(docId) {
    try {
        const db = await connectDB();
        const section = await Section9.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection9:", error);
        Error(error);
    }
}

export async function getSection9Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section9.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection9Docs:", error);
        Error(error);
    }
}

export async function addSection9(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section9({
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
        console.error("addSection9:", error);
        Error(error);
    }
}