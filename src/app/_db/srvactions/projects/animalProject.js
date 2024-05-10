"use server"

import { Animal, Feed, FeedPurchase, DailyFeed } from "@/app/_db/models/projects/animalProject";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

/* ================== ANIMALS ==================
* Database CRUD operations for animal documents.
*/

/**
 * @async Gets all animal documents for a animal project
 * @returns {object} An array of animal documents
 * @see {@link Animal} for object structure
 */
export async function getAnimalDocs(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const animals = await Animal.find({ projectId: ObjectId.createFromHexString(projectId), uid: userID });
        return JSON.parse(JSON.stringify(animals));
    } catch (error) {
        console.error("getAnimals:", error);
        Error(error);
    }
}

/**
 * @async Gets a animal document by its ID
 * @param {string} animalId - The ID of the animal document
 * @returns {object} A animal document
 * @see {@link Animal} for object structure
 */
export async function getAnimal(animalId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const animal = await Animal.findOne({ _id: animalId, uid: userID });
        return JSON.parse(JSON.stringify(animal));
    } catch (error) {
        console.error("getAnimal:", error);
        Error(error);
    }
}

/**
 * @async Add a new animal document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New animal document object
 * @see {@link Animal} for object structure
 */
export async function addAnimal(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const animal = new Animal({
            projects: [{ projectId: ObjectId.createFromHexString(formData.get("projectId"))}],
            uid: userID
        });

        await animal.save();
        return animal;
    } catch (error) {
        console.error("addAnimal:", error);
        Error(error);
    }
}

/**
 * @async Update an animal document in the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} Updated animal document object
 * @see {@link Animal} for object structure
 */
export async function updateAnimal(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const animal = await Animal.findOne({ _id: formData.get("animalId"), uid: userID });
        // animal.name = formData.get("name");
        // animal.animalType = formData.get("animalType");
        // animal.breed = formData.get("breed");
        // animal.birthDate = formData.get("birthDate");
        // animal.purchaseDate = formData.get("purchaseDate");
        // animal.purchaseAmount = formData.get("purchaseAmount");
        // animal.purchaseCost = formData.get("purchaseCost");
        // animal.feedCost = formData.get("feedCost");
        // animal.totalCost = formData.get("totalCost");
        // animal.feed = formData.get("feed");
        // animal.feedAmount = formData.get("feedAmount");
        // animal.feedCost = formData.get("feedCost");
        // animal.feedDate = formData.get("feedDate");
        // animal.feedPurchaceId = formData.get("feedPurchaceId");
        // animal.feedId = formData.get("feedId");

        await animal.save();
        return animal;
    } catch (error) {
        console.error("updateAnimal:", error);
        Error(error);
    }
}


/* ================== FEED ==================
* Database CRUD operations for feed documents.
*/

/**
 * @async Gets all feed documents for a animal project
 * @returns {object} An array of feed documents
 * @see {@link Feed} for object structure
 */
export async function getFeedDocs(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const feed = await Feed.find({ projectId: ObjectId.createFromHexString(projectId), uid: userID });
        return JSON.parse(JSON.stringify(feed));
    } catch (error) {
        console.error("getFeed:", error);
        Error(error);
    }
}

/**
 * @async Gets a feed document by its ID
 * @param {string} feedId - The ID of the feed document
 * @returns {object} A feed document
 * @see {@link Feed} for object structure
 */
export async function getFeed(feedId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const feed = await Feed.findOne({ _id: feedId, uid: userID });
        return JSON.parse(JSON.stringify(feed));
    } catch (error) {
        console.error("getFeed:", error);
        Error(error);
    }
}

/**
 * @async Add a new feed document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New feed document object
 * @see {@link Feed} for object structure
 */
export async function addFeed(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const feed = new Feed({
            projectId: ObjectId.createFromHexString(formData.get("projectId")),
            uid: userID
        });

        await feed.save();
        return feed;
    } catch (error) {
        console.error("addFeed:", error);
        Error(error);
    }
}

/**
 * @async Add a new feed document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New feed document object
 * @see {@link Feed} for object structure
 */
export async function addFeedNoForm(feedName, projectId) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    
    try {
        const db = await connectDB();
        const feed = new Feed({
            name: feedName,
            projectId: ObjectId.createFromHexString(projectId),
            uid: userID
        });

        await feed.save();
        return feed;
    } catch (error) {
        console.error("addFeed:", error);
        Error(error);
    }
}

/**
 * @async Update a feed document in the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} Updated feed document object
 * @see {@link Feed} for object structure
 */
export async function updateFeed(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const feed = await Feed.findOne({ _id: formData.get("feedId"), uid: userID });
        // feed.name = formData.get("name");
        // feed.projectId = formData.get("projectId");
        // feed.uid = userID;

        await feed.save();
        return feed;
    } catch (error) {
        console.error("updateFeed:", error);
        Error(error);
    }
}


/* ================== FEED PURCHASE ==================
* Database CRUD operations for feed purchase documents.
*/

/**
 * @async Gets all feed purchase documents for a animal project
 * @returns {object} An array of feed purchase documents
 * @see {@link FeedPurchase} for object structure
 */
export async function getFeedPurchaseDocs(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const feedPurchase = await FeedPurchase.find({ projectId: ObjectId.createFromHexString(projectId), uid: userID });
        return JSON.parse(JSON.stringify(feedPurchase));
    } catch (error) {
        console.error("getFeedPurchase:", error);
        Error(error);
    }
}

/**
 * @async Gets a feed purchase document by its ID
 * @param {string} feedPurchaseId - The ID of the feed purchase document
 * @returns {object} A feed purchase document
 * @see {@link FeedPurchase} for object structure
 */
export async function getFeedPurchase(feedPurchaseId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const feedPurchase = await FeedPurchase.findOne({ _id: feedPurchaseId, uid: userID });
        return JSON.parse(JSON.stringify(feedPurchase));
    } catch (error) {
        console.error("getFeedPurchase:", error);
        Error(error);
    }
}

/**
 * @async Add a new feed purchase document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New feed purchase document object
 * @see {@link FeedPurchase} for object structure
 */
export async function addFeedPurchase(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const feedPurchase = new FeedPurchase({
            feedId: ObjectId.createFromHexString(formData.get("feedId")),
            purchaseDate: formData.get("purchaseDate"),
            purchaseAmount: formData.get("purchaseAmount"),
            totalCost: formData.get("totalCost"),
            projectId: ObjectId.createFromHexString(formData.get("projectId")),
            uid: userID
        });

        await feedPurchase.save();
        return feedPurchase;
    } catch (error) {
        console.error("addFeedPurchase:", error);
        Error(error);
    }
}

/**
 * @async Update a feed purchase document in the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} Updated feed purchase document object
 * @see {@link FeedPurchase} for object structure
 */
export async function updateFeedPurchase(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const feedPurchase = await FeedPurchase.findOne({ _id: formData.get("feedPurchaseId"), uid: userID });
        // feedPurchase.feedId = formData.get("feedId");
        // feedPurchase.purchaseDate = formData.get("purchaseDate");
        // feedPurchase.purchaseAmount = formData.get("purchaseAmount");
        // feedPurchase.totalCost = formData.get("totalCost");
        // feedPurchase.projectID = formData.get("projectID");
        // feedPurchase.uid = userID;

        await feedPurchase.save();
        return feedPurchase;
    } catch (error) {
        console.error("updateFeedPurchase:", error);
        Error(error);
    }
}


/* ================== DAILY FEED ==================
* Database CRUD operations for daily feed documents.
*/

/**
 * @async Gets all daily feed documents for a animal project
 * @returns {object} An array of daily feed documents
 * @see {@link DailyFeed} for object structure
 */
export async function getDailyFeedDocs(projectId, animalId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const dailyFeed = await DailyFeed.find({ projectId: ObjectId.createFromHexString(projectId), animalId: ObjectId.createFromHexString(animalId), uid: userID });
        return JSON.parse(JSON.stringify(dailyFeed));
    } catch (error) {
        console.error("getDailyFeed:", error);
        Error(error);
    }
}

/**
 * @async Gets a daily feed document by its ID
 * @param {string} dailyFeedId - The ID of the daily feed document
 * @returns {object} A daily feed document
 * @see {@link DailyFeed} for object structure
 */
export async function getDailyFeed(dailyFeedId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const dailyFeed = await DailyFeed.findOne({ _id: dailyFeedId, uid: userID });
        return JSON.parse(JSON.stringify(dailyFeed));
    } catch (error) {
        console.error("getDailyFeed:", error);
        Error(error);
    }
}

/**
 * @async Add a new daily feed document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New daily feed document object
 * @see {@link DailyFeed} for object structure
 */
export async function addDailyFeed(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const dailyFeed = new DailyFeed({
            feedId: ObjectId.createFromHexString(formData.get("feedId")),
            animalId: ObjectId.createFromHexString(formData.get("animalId")),
            feedDate: formData.get("feedDate"),
            feedAmount: formData.get("feedAmount"),
            feedPurchaceId: ObjectId.createFromHexString(formData.get("feedPurchaceId")),
            uid: userID
        });

        await dailyFeed.save();
        return dailyFeed;
    } catch (error) {
        console.error("addDailyFeed:", error);
        Error(error);
    }
}

/**
 * @async Update a daily feed document in the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} Updated daily feed document object
 * @see {@link DailyFeed} for object structure
 */
export async function updateDailyFeed(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const dailyFeed = await DailyFeed.findOne({ _id: formData.get("dailyFeedId"), uid: userID });
        // dailyFeed.feedId = formData.get("feedId");
        // dailyFeed.animalId = formData.get("animalId");
        // dailyFeed.feedDate = formData.get("feedDate");
        // dailyFeed.feedAmount = formData.get("feedAmount");
        // dailyFeed.feedPurchaceId = formData.get("feedPurchaceId");
        // dailyFeed.uid = userID;

        await dailyFeed.save();
        return dailyFeed;
    } catch (error) {
        console.error("updateDailyFeed:", error);
        Error(error);
    }
}