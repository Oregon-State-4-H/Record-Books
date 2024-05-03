"use server"

import { Section11 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection11(docId) {
    try {
        const db = await connectDB();
        const section = await Section11.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection11:", error);
        Error(error);
    }
}

export async function getSection11Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section11.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection11Docs:", error);
        Error(error);
    }
}

export async function addSection11(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section11({
            uid: userID,
            year: formData.get("year"),
            eventAndLevel: formData.get("eventAndLevel"),
            exhibitsOrDivision: formData.get("exhibitsOrDivision"),
            ribbonOrPlacings: formData.get("ribbonOrPlacings")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection11:", error);
        Error(error);
    }
}