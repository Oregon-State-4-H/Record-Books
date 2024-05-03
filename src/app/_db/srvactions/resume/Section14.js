"use server"

import { Section14 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection14(docId) {
    try {
        const db = await connectDB();
        const section = await Section14.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection14:", error);
        Error(error);
    }
}

export async function getSection14Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section14.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection14Docs:", error);
        Error(error);
    }
}

export async function addSection14(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section14({
            uid: userID,
            year: formData.get("year"),
            recognitionType: formData.get("recognitionType")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection14:", error);
        Error(error);
    }
}