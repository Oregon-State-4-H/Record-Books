"use server"

import { Project } from "@/app/_db/models/project";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * @async Gets all current project documents for the current user
 * @returns {object} An array of project documents
 * @see {@link Project} for object structure
 */
export async function getCurrentProjects() {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        /* year is formatted as yyyy-yy. If currentDate >= October 1 of a year
         * then it will be the current year - the last two digits of the next year/
         * For example, if the current date is October 1, 2022, then the year will be 2022-23
        */
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const formattedYear = month >= 9 ? `${year}-${(year % 1000) + 1}` : `${year - 1}-${(year % 1000)}`;

        const projects = await Project.find({ uid: userID, year: formattedYear});
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("getCurrentProjects:", error);
        Error(error);
    }
}

/**
 * @async Gets all project documents for the current user
 * @returns {object} An array of project documents
 * @see {@link Project} for object structure
 */
export async function getProjects() {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const projects = await Project.find({ uid: userID});
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("getProjects:", error);
        Error(error);
    }
}

/**
 * @async Gets a project document by its ID
 * @param {string} projectId - The ID of the project document
 * @returns {object} A project document
 * @see {@link Project} for object structure
 */
export async function getProject(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const project = await Project.findOne({ _id: projectId, uid: userID });
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error("getProject:", error);
        Error(error);
    }
}

/**
 * @async Add a new project document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New project document object
 * @see {@link Project} for object structure
 */
export async function addProject(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const project = new Project({
            uid: userID,
            year: formData.get("year"),
            projectName: formData.get("projectName"),
            description: formData.get("description"),
            type: formData.get("type"),
            startDate: new Date(formData.get("startDate")).toISOString(),
            endDate: new Date(formData.get("endDate")).toISOString(),
        });

        await project.save();

        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error("addProject:", error);
        Error(error);
    }
}

/**
 * @async Updates a project document in the database
 * @param {object} prevState - The previous state of the project document
 * @param {object} formData - The updated form data
 * @returns {object} A project document
 * @see {@link Project} for object structure
 */
export async function updateProject(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const project = await Project.findOne({ _id: formData.get("_id"), uid: userID });

        project.year = formData.get("year");
        project.projectName = formData.get("projectName");
        project.description = formData.get("description");
        project.type = formData.get("type");
        project.startDate = new Date(formData.get("startDate")).toISOString();
        project.endDate = new Date(formData.get("endDate")).toISOString();

        await project.save();

        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        Error(error);
    }
}