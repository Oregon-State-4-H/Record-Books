"use server"

import { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14 } from "@/app/_db/models/resumeSections";
import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * @async Get all resume documents for the current user.
 * @returns {object} An object containing all resume section documents
 * @see {@link User} for section 0 object structure
 */
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


/* ================== SECTION 1 ==================
* Database CRUD operations for resume Section 1 documents.
*/

/**
 * @async Get a section 1 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 1 document object
 * @see {@link Section1} for object structure
 */
export async function getSection1(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

        const db = await connectDB();
        const section = await Section1.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection1:", error);
        Error(error);
    }
}

/**
 * @async Get all section 1 documents from database for the current user.
 * @returns {array} Array of section 1 document objects
 * @see {@link Section1} for object structure
 */
export async function getSection1Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section1.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection1Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 1 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 1 document object
 * @see {@link Section1} for object structure
 */
export async function addSection1(prevState, formData){
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section1({
            uid: userID,
            year: formData.get("year"),
            grade: formData.get("grade"),
            clubName: formData.get("clubName"),
            numInClub: formData.get("numInClub"),
            clubLeader: formData.get("clubLeader"),
            meetingsHeld: formData.get("meetingsHeld"),
            meetingsAttended: formData.get("meetingsAttended")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection1:", error);
        Error(error);
    }
}

/**
 * @async Update a section 1 document in the database.
 * @param {*} prevState 
 * @param {*} formData
 * @returns 
 */
export async function updateSection1(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section1.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 1 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.grade = formData.get("grade");
        section.clubName = formData.get("clubName");
        section.numInClub = formData.get("numInClub");
        section.clubLeader = formData.get("clubLeader");
        section.meetingsHeld = formData.get("meetingsHeld");
        section.meetingsAttended = formData.get("meetingsAttended");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection1:", error);
        Error(error);
    }

}

/**
 * @async Delete a section 1 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection1(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section1.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection1:", error);
        Error(error);
    }

}


/* ================== SECTION 2 ==================
* Database CRUD operations for resume Section 2 documents.
*/

/**
 * @async Get a section 2 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 2 document object
 * @see {@link Section2} for object structure
 */
export async function getSection2(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section2.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection2:", error);
        Error(error);
    }
}

/**
 * @async Get all section 2 documents from database for the current user.
 * @returns {array} Array of section 2 document objects
 * @see {@link Section2} for object structure
 */
export async function getSection2Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section2.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection2Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 2 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 2 document object
 * @see {@link Section2} for object structure
 */
export async function addSection2(prevState, formData){
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section2({
            uid: userID,
            year: formData.get("year"),
            projectName: formData.get("projectName"),
            projectScope: formData.get("projectScope")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection2:", error);
        Error(error);
    }
}

/**
 * @async Update a section 2 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection2(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section2.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 2 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.projectName = formData.get("projectName");
        section.projectScope = formData.get("projectScope");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection2:", error);
        Error(error);
    }

}

/**
 * @async Delete a section 2 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean}
 */
export async function deleteSection2(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section2.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection2:", error);
        Error(error);
    }
}


/* ================== SECTION 3 ==================
* Database CRUD operations for resume Section 3 documents.
*/

/**
 * @async Get a section 3 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 3 document object
 * @see {@link Section3} for object structure
 */
export async function getSection3(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section3.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection3:", error);
        Error(error);
    }
}

/**
 * @async Get all section 3 documents from database for the current user.
 * @returns {array} Array of section 3 document objects
 * @see {@link Section3} for object structure
 */
export async function getSection3Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section3.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection3Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 3 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 3 document object
 * @see {@link Section3} for object structure
 */
export async function addSection3(prevState, formData){
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = new Section3({
            uid: userID,
            year: formData.get("year"),
            activityKind: formData.get("activityKind"),
            thingsLearned: formData.get("thingsLearned"),
            level: formData.get("level")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection3:", error);
        Error(error);
    }
}

/**
 * @async Update a section 3 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection3(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section3.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 3 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.activityKind = formData.get("activityKind");
        section.thingsLearned = formData.get("thingsLearned");
        section.level = formData.get("level");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection3:", error);
        Error(error);
    }


}

/**
 * @async Delete a section 3 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean}
 */
export async function deleteSection3(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section3.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection3:", error);
        Error(error);
    }
}

/* ================== SECTION 4 ==================
* Database CRUD operations for resume Section 4 documents.
*/

/**
 * @async Get a section 4 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 4 document object
 * @see {@link Section4} for object structure
 */
export async function getSection4(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section4.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection4:", error);
        Error(error);
    }
}

/**
 * @async Get all section 4 documents from database for the current user.
 * @returns {array} Array of section 4 document objects
 * @see {@link Section4} for object structure
 */
export async function getSection4Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section4.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection4Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 4 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 4 document object
 * @see {@link Section4} for object structure
 */
export async function addSection4(prevState, formData){
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    
    try {
        const db = await connectDB();
        const section = new Section4({
            uid: userID,
            year: formData.get("year"),
            activityKind: formData.get("activityKind"),
            scope: formData.get("scope"),
            level: formData.get("level")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection4:", error);
        Error(error);
    }
}

/**
 * @async Update a section 4 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection4(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section4.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 4 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.activityKind = formData.get("activityKind");
        section.scope = formData.get("scope");
        section.level = formData.get("level");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection4:", error);
        Error(error);
    }


}

/**
 * @async Delete a section 4 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean}
 */
export async function deleteSection4(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section4.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection4:", error);
        Error(error);
    }
}


/* ================== SECTION 5 ==================
* Database CRUD operations for resume Section 5 documents.
*/

/**
 * @async Get a section 5 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 5 document object
 * @see {@link Section5} for object structure
 */
export async function getSection5(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section5.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection5:", error);
        Error(error);
    }
}

/**
 * @async Get all section 5 documents from database for the current user.
 * @returns {array} Array of section 5 document objects
 * @see {@link Section5} for object structure
 */
export async function getSection5Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section5.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection5Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 5 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 5 document object
 * @see {@link Section5} for object structure
 */
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

/**
 * @async Update a section 5 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection5(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section5.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 5 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.leadershipRole = formData.get("leadershipRole");
        section.hoursSpent = formData.get("hoursSpent");
        section.numPeopleReached = formData.get("numPeopleReached");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection5:", error);
        Error(error);
    }


}

/**
 * @async Delete a section 5 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection5(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section5.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection5:", error);
        Error(error);
    }

}

/* ================== SECTION 6 ==================
* Database CRUD operations for resume Section 6 documents.
*/

/**
 * @async Get a section 6 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 6 document object
 * @see {@link Section6} for object structure
 */
export async function getSection6(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section6.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection6:", error);
        Error(error);
    }
}

/**
 * @async Get all section 6 documents from database for the current user.
 * @returns {array} Array of section 6 document objects
 * @see {@link Section6} for object structure
 */
export async function getSection6Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section6.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection6Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 6 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 6 document object
 * @see {@link Section6} for object structure
 */
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

/**
 * @async Update a section 6 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection6(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section6.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 6 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.organizationName = formData.get("organizationName");
        section.leadershipRole = formData.get("leadershipRole");
        section.hoursSpent = formData.get("hoursSpent");
        section.numPeopleReached = formData.get("numPeopleReached");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection6:", error);
        Error(error);
    }    
}

/**
 * @async Delete a section 6 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection6(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section6.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection6:", error);
        Error(error);
    }

}


/* ================== SECTION 7 ==================
* Database CRUD operations for resume Section 7 documents.
*/

/**
 * @async Get a section 7 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 7 document object
 * @see {@link Section7} for object structure
 */
export async function getSection7(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section7.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection7:", error);
        Error(error);
    }
}

/**
 * @async Get all section 7 documents from database for the current user.
 * @returns {array} Array of section 7 document objects
 * @see {@link Section7} for object structure
 */
export async function getSection7Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section7.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection7Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 7 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 7 document object
 * @see {@link Section7} for object structure
 */
export async function addSection7(prevState, formData){
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    
    try {
        const db = await connectDB();
        const section = new Section7({
            uid: userID,
            year: formData.get("year"),
            clubMemberActivities: formData.get("clubMemberActivities"),
            hoursSpent: formData.get("hoursSpent"),
            numPeopleReached: formData.get("numPeopleReached")
        });

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("addSection7:", error);
        Error(error);
    }
}

/**
 * @async Update a section 7 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection7(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section7.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 7 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.clubMemberActivities = formData.get("clubMemberActivities");
        section.hoursSpent = formData.get("hoursSpent");
        section.numPeopleReached = formData.get("numPeopleReached");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection7:", error);
        Error(error);
    }    
}

/**
 * @async Delete a section 7 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection7(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section7.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection7:", error);
        Error(error);
    }

}


/* ================== SECTION 8 ==================
* Database CRUD operations for resume Section 8 documents.
*/

/**
 * @async Get a section 8 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 8 document object
 * @see {@link Section8} for object structure
 */
export async function getSection8(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section8.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection8:", error);
        Error(error);
    }
}

/**
 * @async Get all section 8 documents from database for the current user.
 * @returns {array} Array of section 8 document objects
 * @see {@link Section8} for object structure
 */
export async function getSection8Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section8.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection8Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 8 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 8 document object
 * @see {@link Section8} for object structure
 */
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

/**
 * @async Update a section 8 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection8(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section8.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 8 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.individualGroupActivities = formData.get("individualGroupActivities");
        section.hoursSpent = formData.get("hoursSpent");
        section.numPeopleReached = formData.get("numPeopleReached");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection8:", error);
        Error(error);
    }


}

/**
 * @async Delete a section 8 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection8(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section8.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection8:", error);
        Error(error);
    }

}


/* ================== SECTION 9 ==================
* Database CRUD operations for resume Section 9 documents.
*/

/**
 * @async Get a section 9 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 9 document object
 * @see {@link Section9} for object structure
 */
export async function getSection9(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section9.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection9:", error);
        Error(error);
    }
}

/**
 * @async Get all section 9 documents from database for the current user.
 * @returns {array} Array of section 9 document objects
 * @see {@link Section9} for object structure
 */
export async function getSection9Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section9.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection9Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 9 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 9 document object
 * @see {@link Section9} for object structure
 */
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

/**
 * @async Update a section 9 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection9(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section9.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 9 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.communicationType = formData.get("communicationType");
        section.topic = formData.get("topic");
        section.timesGiven = formData.get("timesGiven");
        section.location = formData.get("location");
        section.audienceSize = formData.get("audienceSize");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection9:", error);
        Error(error);
    }
}

/**
 * @async Delete a section 9 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection9(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section9.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection9:", error);
        Error(error);
    }

}


/* ================== SECTION 10 ==================
* Database CRUD operations for resume Section 10 documents.
*/

/**
 * @async Get a section 10 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 10 document object
 * @see {@link Section10} for object structure
 */
export async function getSection10(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section10.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection10:", error);
        Error(error);
    }
}

/**
 * @async Get all section 10 documents from database for the current user.
 * @returns {array} Array of section 10 document objects
 * @see {@link Section10} for object structure
 */
export async function getSection10Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section10.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection10Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 10 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 10 document object
 * @see {@link Section10} for object structure
 */
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

/**
 * @async Update a section 10 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection10(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section10.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 10 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.communicationType = formData.get("communicationType");
        section.topic = formData.get("topic");
        section.timesGiven = formData.get("timesGiven");
        section.location = formData.get("location");
        section.audienceSize = formData.get("audienceSize");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection10:", error);
        Error(error);
    }
}

/**
 * @async Delete a section 10 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection10(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section10.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection10:", error);
        Error(error);
    }

}


/* ================== SECTION 11 ==================
* Database CRUD operations for resume Section 11 documents.
*/

/**
 * @async Get a section 11 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 11 document object
 * @see {@link Section11} for object structure
 */
export async function getSection11(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section11.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection11:", error);
        Error(error);
    }
}

/**
 * @async Get all section 11 documents from database for the current user.
 * @returns {array} Array of section 11 document objects
 * @see {@link Section11} for object structure
 */
export async function getSection11Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section11.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection11Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 11 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 11 document object
 * @see {@link Section11} for object structure
 */
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

/**
 * @async Update a section 11 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection11(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section11.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 11 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.eventAndLevel = formData.get("eventAndLevel");
        section.exhibitsOrDivision = formData.get("exhibitsOrDivision");
        section.ribbonOrPlacings = formData.get("ribbonOrPlacings");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection11:", error);
        Error(error);
    }
}

/**
 * @async Delete a section 11 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection11(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section11.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection11:", error);
        Error(error);
    }

}


/* ================== SECTION 12 ==================
* Database CRUD operations for resume Section 12 documents.
*/

/**
 * @async Get a section 12 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 12 document object
 * @see {@link Section12} for object structure
 */
export async function getSection12(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section12.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection12:", error);
        Error(error);
    }
}

/**
 * @async Get all section 12 documents from database for the current user.
 * @returns {array} Array of section 12 document objects
 * @see {@link Section12} for object structure
 */
export async function getSection12Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section12.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection12Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 12 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 12 document object
 * @see {@link Section12} for object structure
 */
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

/**
 * @async Update a section 12 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection12(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section12.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 12 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.contestOrEvent = formData.get("contestOrEvent");
        section.recognitionReceived = formData.get("recognitionReceived");
        section.level = formData.get("level");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection12:", error);
        Error(error);
    }
}

/**
 * @async Delete a section 12 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection12(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section12.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection12:", error);
        Error(error);
    }

}


/* ================== SECTION 13 ==================
* Database CRUD operations for resume Section 13 documents.
*/

/**
 * @async Get a section 13 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 13 document object
 * @see {@link Section13} for object structure
 */
export async function getSection13(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section13.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection13:", error);
        Error(error);
    }
}

/**
 * @async Get all section 13 documents from database for the current user.
 * @returns {array} Array of section 13 document objects
 * @see {@link Section13} for object structure
 */
export async function getSection13Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section13.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection13Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 13 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 13 document object
 * @see {@link Section13} for object structure
 */
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

/**
 * @async Update a section 13 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection13(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section13.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 13 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.recognitionType = formData.get("recognitionType");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection13:", error);
        Error(error);
    }

}

/**
 * @async Delete a section 13 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection13(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section13.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection13:", error);
        Error(error);
    }

}


/* ================== SECTION 14 ==================
* Database CRUD operations for resume Section 14 documents.
*/

/**
 * @async Get a section 14 document from database by document id.
 * @param {string} docId MongoDB document id
 * @returns {object} Section 14 document object
 * @see {@link Section14} for object structure
 */
export async function getSection14(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const section = await Section14.findOne({ _id: docId, uid: userID});
        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("getSection14:", error);
        Error(error);
    }
}

/**
 * @async Get all section 14 documents from database for the current user.
 * @returns {array} Array of section 14 document objects
 * @see {@link Section14} for object structure
 */
export async function getSection14Docs(){
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const sections = await Section14.find({ uid: userID });
        return JSON.parse(JSON.stringify(sections));
    } catch (error) {
        console.error("getSection14Docs:", error);
        Error(error);
    }
}

/**
 * @async Add a new section 14 document to the database.
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New section 14 document object
 * @see {@link Section14} for object structure
 */
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

/**
 * @async Update a section 14 document in the database.
 * @param {*} prevState 
 * @param {*} formData 
 * @returns 
 */
export async function updateSection14(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const section = await Section14.findOne({ _id: formData.get("id"), uid: userID });
        if (!section) {
            console.error("Section 14 document not found");
            return null;
        }

        section.year = formData.get("year");
        section.recognitionType = formData.get("recognitionType");

        await section.save();

        return JSON.parse(JSON.stringify(section));
    } catch (error) {
        console.error("updateSection14:", error);
        Error(error);
    }
}

/**
 * @async Delete a section 14 document from the database.
 * @param {string} docId MongoDB document id
 * @returns {Boolean} 
 */
export async function deleteSection14(docId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        return await Section14.deleteOne({ _id: docId, uid: userID });
    } catch (error) {
        console.error("deleteSection14:", error);
        Error(error);
    }

}