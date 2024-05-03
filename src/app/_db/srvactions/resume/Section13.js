"use server"

import { Section13 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection13(docId) {
    try {
        const db = await connectDB();
        const section = await Section13.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection13:", error);
        Error(error);
    }
}

export async function getSection13Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section13.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection13Docs:", error);
        Error(error);
    }
}

export async function addSection13(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section13({
            uid: userID,
            year: formData.get("year"),
            recognitionType: formData.get("recognitionType")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection13:", error);
        Error(error);
    }
}