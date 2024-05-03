"use server"

import { Section12 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection12(docId) {
    try {
        const db = await connectDB();
        const section = await Section12.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection12:", error);
        Error(error);
    }
}

export async function getSection12Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section12.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection12Docs:", error);
        Error(error);
    }
}

export async function addSection12(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
   
    try {
        const db = await connectDB();
        const section = new Section12({
            uid: userID,
            year: formData.get("year"),
            contestOrEvent: formData.get("contestOrEvent"),
            recognitionReceived: formData.get("recognitionReceived"),
            level: formData.get("level"),
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection12:", error);
        Error(error);
    }
}