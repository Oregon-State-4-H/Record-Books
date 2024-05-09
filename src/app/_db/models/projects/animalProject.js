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
});

export const feedPurchaseModel = mongoose.Schema({
    feedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feed"
    },
    purchaseDate: Date,
    purchaseAmount: Number,
    totalCost: Number,
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

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
});

export const Animal = mongoose.models.animals || mongoose.model("animals", animalModel);
export const Feed = mongoose.models.feed || mongoose.model("feed", feedModel);
export const DailyFeed = mongoose.models.dailyFeed || mongoose.model("dailyFeed", dailyFeedModel);
export const FeedPurchase = mongoose.models.feedPurchase || mongoose.model("feedPurchase", feedPurchaseModel);