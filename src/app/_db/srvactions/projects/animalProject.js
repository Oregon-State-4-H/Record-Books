"use server"

import { Animal, Feed, FeedPurchase, DailyFeed, Expenses, Supplies } from "@/app/_db/models/projects/animalProject";
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

        const animals = await Animal.find({ projects: { $in: [projectId] }, uid: userID });
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
            projects: [ObjectId.createFromHexString(formData.get("projectId"))],
            uid: userID,
            name: formData.get("name"),
            species: formData.get("species"),
            animalId: formData.get("animalId"),
            birthdate: new Date(formData.get("birthdate")).toISOString(),
            purchaseDate: new Date(formData.get("purchaseDate")).toISOString(),
            sireBreed: formData.get("sireBreed"),
            damBreed: formData.get("damBreed"),
            animalCost: formData.get("animalCost")
        });

        await animal.save();
        return JSON.parse(JSON.stringify(animal));
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

        console.log("updateAnimal:", formData);

        animal.name = formData.get("name");
        animal.species = formData.get("species");
        animal.sireBreed = formData.get("sireBreed");
        animal.damBreed = formData.get("damBreed");
        animal.birthDate = new Date(formData.get("birthDate")).toISOString();
        animal.purchaseDate = new Date(formData.get("purchaseDate")).toISOString();
        animal.animalCost = formData.get("animalCost");

        await animal.save();
        return JSON.parse(JSON.stringify(animal));
    } catch (error) {
        console.error("updateAnimal:", error);
        Error(error);
    }
}

export async function updateRateOfGain(prevState, formData) {
    const session = await getSession(); 
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    console.log("updateRateOfGain:", formData);
    try {
        const db = await connectDB();
        const animal = await Animal.findOne({ _id: formData.get("animalId"), uid: userID });

        animal.beginningWeight = formData.get("beginningWeight");
        animal.beginningDate = new Date(formData.get("beginningDate")).toISOString();
        if (formData.get("endWeight") !== "")
            animal.endWeight = formData.get("endWeight");
        if (formData.get("endDate") !== "")
            animal.endDate = new Date(formData.get("endDate")).toISOString();
    
        await animal.save();
        return JSON.parse(JSON.stringify(animal));
    } catch (error) {
        console.error("updateRateofGain:", error);
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

        const feed = await Feed.find({ projectId: projectId, uid: userID });
        return JSON.parse(JSON.stringify(feed));
    } catch (error) {
        console.error("getFeedDocs:", error);
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
        return JSON.parse(JSON.stringify(feed));
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
        return JSON.parse(JSON.stringify(feed));
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

        const feedPurchase = await FeedPurchase.find({ projectId: projectId, uid: userID }).populate("feedId").exec();
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
            datePurchased: formData.get("datePurchased"),
            amountPurchased: formData.get("amountPurchased"),
            totalCost: formData.get("totalCost"),
            projectId: ObjectId.createFromHexString(formData.get("projectId")),
            uid: userID
        });

        await feedPurchase.save();
        return JSON.parse(JSON.stringify(feedPurchase));
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

        const dailyFeed = await DailyFeed.find({ projectId: projectId, animalId: animalId, uid: userID }).populate("feedId").populate("feedPurchaceId").exec();

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
            uid: userID,
            projectId: ObjectId.createFromHexString(formData.get("projectId"))
        });

        await dailyFeed.save();
        return JSON.parse(JSON.stringify(dailyFeed));
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


/* ================== EXPENSES ==================
* Database CRUD operations for expenses documents.
*/

/**
 * @async Gets all expenses documents for a animal project
 * @returns {object} An array of expenses documents
 * @see {@link Expenses} for object structure
 */
export async function getExpenseDocs(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const expenses = await Expenses.find({ projectId: projectId, uid: userID });
        return JSON.parse(JSON.stringify(expenses));
    } catch (error) {
        console.error("getExpenses:", error);
        Error(error);
    }
}

/**
 * @async Gets a expenses document by its ID
 * @param {string} expensesId - The ID of the expenses document
 * @returns {object} A expenses document
 * @see {@link Expenses} for object structure
 */
export async function getExpense(expenseId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const expense = await Expenses.findOne({ _id: expenseId, uid: userID });
        return JSON.parse(JSON.stringify(expense));
    } catch (error) {
        console.error("getExpense:", error);
        Error(error);
    }
}

/**
 * @async Add a new expenses document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New expenses document object
 * @see {@link Expenses} for object structure
 */
export async function addExpense(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    console.log("addExpense projectId: ", formData.get("projectId"));

    try {
        const db = await connectDB();
        const expense = new Expenses({
            date: formData.get("date"),
            items: formData.get("items"),
            quantity: formData.get("quantity"),
            cost: formData.get("cost"),
            projectId: ObjectId.createFromHexString(formData.get("projectId")),
            uid: userID
        });

        await expense.save();
        return JSON.parse(JSON.stringify(expense));
    } catch (error) {
        console.error("addExpense:", error);
        Error(error);
    }
}


/* ================== SUPPLY INVENTORY ==================
* Database CRUD operations for supply inventory documents.
*/

/**
 * @async Gets all supply inventory documents for a animal project
 * @returns {object} An array of supply inventory documents
 * @see {@link Supplies} for object structure
 */
export async function getSupplyDocs(projectId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const supplies = await Supplies.find({ projectId: projectId, uid: userID });
        return JSON.parse(JSON.stringify(supplies));
    } catch (error) {
        console.error("getSupplies:", error);
        Error(error);
    }
}

/**
 * @async Gets a supply inventory document by its ID
 * @param {string} supplyId - The ID of the supply inventory document
 * @returns {object} A supply inventory document
 * @see {@link Supplies} for object structure
 */
export async function getSupply(supplyId) {
    try {
        const session = await getSession();
        const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
        const db = await connectDB();

        const supply = await Supplies.findOne({ _id: supplyId, uid: userID });
        return JSON.parse(JSON.stringify(supply));
    } catch (error) {
        console.error("getSupply:", error);
        Error(error);
    }
}

/**
 * @async Add a new supply inventory document to the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} New supply inventory document object
 * @see {@link Supplies} for object structure
 */
export async function addSupply(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));
    console.log("addSupply projectId: ", formData.get("projectId"));

    try {
        const db = await connectDB();
        const supply = new Supplies({
            description: formData.get("description"),
            startValue: formData.get("startValue"),
            endValue: formData.get("endValue"),
            projectId: ObjectId.createFromHexString(formData.get("projectId")),
            uid: userID
        });

        await supply.save();
        return JSON.parse(JSON.stringify(supply));
    } catch (error) {
        console.error("addSupply:", error);
        Error(error);
    }
}

/**
 * @async Update a supply inventory document in the database
 * @param {object} prevState Previous form state
 * @param {object} formData Form data
 * @returns {object} Updated supply inventory document object
 * @see {@link Supplies} for object structure
 */
export async function updateSupply(prevState, formData) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const supply = await Supplies.findOne({ _id: formData.get("supplyId"), uid: userID });
        // supply.description = formData.get("description");
        // supply.startValue = formData.get("startValue");
        // supply.endValue = formData.get("endValue");
        // supply.projectId = formData.get("projectId");
        // supply.uid = userID;

        await supply.save();
        return supply;
    } catch (error) {
        console.error("updateSupply:", error);
        Error(error);
    }
}

/**
 * @async Delete a supply inventory document from the database
 * @param {string} supplyId - The ID of the supply inventory document
 * @returns {object} Deleted supply inventory document object
 * @see {@link Supplies} for object structure
 */
export async function deleteSupply(supplyId) {
    const session = await getSession();
    const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

    try {
        const db = await connectDB();
        const supply = await Supplies.findOneAndDelete({ _id: supplyId, uid: userID });
        return supply;
    } catch (error) {
        console.error("deleteSupply:", error);
        Error(error);
    }
}