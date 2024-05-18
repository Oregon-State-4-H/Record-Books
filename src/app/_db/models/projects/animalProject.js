const mongoose = require("mongoose");

export const animalModel = mongoose.Schema({
    name: String,
    species: String,
    animalId: String,
    birthdate: Date,
    purchaseDate: Date,
    sireBreed: String,
    damBreed: String,
    endWeight: Number,
    endDate: Date,
    beginningWeight: Number,
    beginningDate: Date,
    animalCost: Number,
    salePrice: Number,
    yieldGrade: Number,
    qualityGrade: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    }]
});

export const feedModel = mongoose.Schema({
    name: String,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { collection: 'feed' });

export const feedPurchaseModel = mongoose.Schema({
    feedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feed"
    },
    datePurchased: Date,
    amountPurchased: Number,
    totalCost: Number,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { collection: 'feedPurchases' });

export const dailyFeedModel = mongoose.Schema({
    feedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feed"
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "animals"
    },
    feedDate: Date,
    feedAmount: Number,
    feedPurchaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedPurchase"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { collection: 'dailyFeed' });

export const expensesModel = mongoose.Schema({
    date: Date,
    items: String,
    quantity: Number,
    cost: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    }]
}, { collection: 'expenses' });

export const Animal = mongoose.models.animals || mongoose.model("animals", animalModel);
export const Feed = mongoose.models.feed || mongoose.model("feed", feedModel);
export const DailyFeed = mongoose.models.dailyFeed || mongoose.model("dailyFeed", dailyFeedModel);
export const FeedPurchase = mongoose.models.feedPurchases || mongoose.model("feedPurchases", feedPurchaseModel);
export const Expenses = mongoose.models.expenses || mongoose.model("expenses", expensesModel);