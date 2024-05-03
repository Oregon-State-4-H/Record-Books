"use server"

import { Section6 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection6(docId) {
    try {
        const db = await connectDB();
        const section = await Section6.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection6:", error);
        Error(error);
    }
}

export async function getSection6Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section6.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection6Docs:", error);
        Error(error);
    }
}

export async function addSection6(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section6({
            uid: userID,
            year: formData.get("year"),
            organizationName: formData.get("organizationName"),
            leadershipRole: formData.get("leadershipRole"),
            hoursSpent: formData.get("hoursSpent"),
            numPeopleReached: formData.get("numPeopleReached")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection6:", error);
        Error(error);
    }
}