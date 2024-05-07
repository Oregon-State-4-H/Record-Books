"use server"

import { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export async function getResumeDocs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const userDoc = await User.findOne(userID);
        if (!userDoc) {
            console.error("User not found");
            return null;
        }

        const section1 = await Section1.find({ uid: userID });
        const section2 = await Section2.find({ uid: userID });
        const section3 = await Section3.find({ uid: userID });
        const section4 = await Section4.find({ uid: userID });
        const section5 = await Section5.find({ uid: userID });
        const section6 = await Section6.find({ uid: userID });
        const section7 = await Section7.find({ uid: userID });
        const section8 = await Section8.find({ uid: userID });
        const section9 = await Section9.find({ uid: userID });
        const section10 = await Section10.find({ uid: userID });
        const section11 = await Section11.find({ uid: userID });
        const section12 = await Section12.find({ uid: userID });
        const section13 = await Section13.find({ uid: userID });
        const section14 = await Section14.find({ uid: userID });

        return {
            section0Data: JSON.parse(JSON.stringify(userDoc)),
            section1Data: JSON.parse(JSON.stringify(section1)),
            section2Data: JSON.parse(JSON.stringify(section2)),
            section3Data: JSON.parse(JSON.stringify(section3)),
            section4Data: JSON.parse(JSON.stringify(section4)),
            section5Data: JSON.parse(JSON.stringify(section5)),
            section6Data: JSON.parse(JSON.stringify(section6)),
            section7Data: JSON.parse(JSON.stringify(section7)),
            section8Data: JSON.parse(JSON.stringify(section8)),
            section9Data: JSON.parse(JSON.stringify(section9)),
            section10Data: JSON.parse(JSON.stringify(section10)),
            section11Data: JSON.parse(JSON.stringify(section11)),
            section12Data: JSON.parse(JSON.stringify(section12)),
            section13Data: JSON.parse(JSON.stringify(section13)),
            section14Data: JSON.parse(JSON.stringify(section14))
        };
    } catch (error) {
        console.error("getResumeDocs:", error);
        Error(error);
    }
}