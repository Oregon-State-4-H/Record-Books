"use server"

import { Section5 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getSection5(docId) {
    try {
        const db = await connectDB();
        const section = await Section5.findOne({ _id: docId });
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection5:", error);
        Error(error);
    }
}

export async function getSection5Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }


        const sections = await Section5.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection5Docs:", error);
        Error(error);
    }
}

export async function addSection5(prevState, formData){
    const session = await getSession();

    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));    

    try {
        const db = await connectDB();
        const section = new Section5({
            uid: userID,
            year: formData.get("year"),
            leadershipRole: formData.get("leadershipRole"),
            hoursSpent: formData.get("hoursSpent"),
            numPeopleReached: formData.get("numPeopleReached")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection5:", error);
        Error(error);
    }
}