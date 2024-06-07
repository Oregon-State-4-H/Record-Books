"use server"

import { User } from "@/app/_db/models/user";
import connectDB from "@/app/_db/mongodb";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * @async Gets the user profile document by its ID
 * @returns {object} A user profile document
 * @see {@link User} for object structure
 */
export async function getUserProfile() {
    try {
        const session = await getSession();
        const uid = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();
        const user = await User.findOne({ _id: uid });
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("getUserProfile:", error);
        Error(error);
    }
}

/**
 * @async Updates the user profile document
 * @param {object} prevState - The previous state of the user profile document
 * @param {object} formData - The new state of the user profile document
 * @returns {object} A user profile document
 * @see {@link User} for object structure
 */
export async function updateUserProfile(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    const data = {
       $set: {
            birthdate: formData.get("birthdate"),
            first_name: formData.get("first_name"),
            middle_name_initial: formData.get("middle_name_initial"),
            last_name_initial: formData.get("last_name_initial"),
            county_name: formData.get("county_name"),
            join_date: formData.get("join_date")
        }
    };

    try {
        const db = await connectDB();
        const userDoc = await User.findOne(userID);

        if (!userDoc) {
            console.error("User not found");
            return null;
        }

        const newUserDoc = await User.updateOne({_id: userDoc._id}, data);
        
        if (!newUserDoc) {
            console.error("User not found");
            return null;
        }

        revalidatePath("/dashboard/account/profile");
        return JSON.parse(JSON.stringify(newUserDoc));
    } catch (error) {
        console.error("updateUserProfile:", error);
        Error(error);
    }
}


export async function getUserBookmarks() {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    const db = await connectDB();
    const user = await User
        .findOne({ _id: userID })
        .populate("bookmarks");

    if (!user) {
        console.error("User not found");
        return null;
    }

    return JSON.parse(JSON.stringify(user.bookmarks));
}


export async function addUserBookmark(link, label) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    const db = await connectDB();
    const user = await User.findOne({ _id: userID });

    if (!user) {
        console.error("User not found");
        return null;
    }

    const bookmarks = user.bookmarks;
    

    // Check if the link is already bookmarked
    // Only return the bookmarks
    if (bookmarks.find(b => b.link === link)) {
        return JSON.parse(JSON.stringify(user.bookmarks));
    }

    bookmarks.push({
        link: link,
        label: label
    });

    user.bookmarks = bookmarks;
    user.save();
    return JSON.parse(JSON.stringify(user.bookmarks));
}

export async function removeUserBookmark(link) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    const db = await connectDB();
    const user = await User
        .findOne({ _id: userID })
        .populate("bookmarks");

    if (!user) {
        console.error("User not found");
        return null;
    }

    const bookmarks = user.bookmarks;
    const bookmark = bookmarks.find(b => b.link === link);
    const index = bookmarks.indexOf(bookmark);

    if (index > -1) {
        bookmarks.splice(index, 1);
    }

    user.bookmarks = bookmarks;
    user.save();
    return JSON.parse(JSON.stringify(user));
}