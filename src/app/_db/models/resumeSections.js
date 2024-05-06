const mongoose = require("mongoose");

export const section1Model = mongoose.Schema({
    year: String,
    grade: Number,
    clubName: String,
    numInClub: Number,
    clubLeader: String,
    meetingsHeld: Number,
    meetingsAttended: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section2Model = mongoose.Schema({
    year: String,
    projectName: String,
    projectScope: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section3Model = mongoose.Schema({
    year: String,
    activityKind: String,
    thingsLearned: String,
    level: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section4Model = mongoose.Schema({
    year: String,
    activityKind: String,
    scope: String,
    level: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section5Model = mongoose.Schema({
    year: String,
    leadershipRole: String,
    hoursSpent: Number,
    numPeopleReached: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section6Model = mongoose.Schema({
    year: String,
    organizationName: String,
    leadershipRole: String,
    hoursSpent: Number,
    numPeopleReached: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section7Model = mongoose.Schema({
    year: String,
    clubMemberActivities: String,
    hoursSpent: Number,
    numPeopleReached: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section8Model = mongoose.Schema({
    year: String,
    individualGroupActivities: String,
    hoursSpent: Number,
    numPeopleReached: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section9Model = mongoose.Schema({
    year: String,
    communicationType: String,
    topic: String,
    timesGiven: Number,
    location: String,
    audienceSize: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section10Model = mongoose.Schema({
    year: String,
    communicationType: String,
    topic: String,
    timesGiven: Number,
    location: String,
    audienceSize: Number,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section11Model = mongoose.Schema({
    year: String,
    eventAndLevel: String,
    exhibitsOrDivision: String,
    ribbonOrPlacings: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section12Model = mongoose.Schema({
    year: String,
    contestOrEvent: String,
    recognitionReceived: String,
    level: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section13Model = mongoose.Schema({
    year: String,
    recognitionType: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const section14Model = mongoose.Schema({
    year: String,
    recognitionType: String,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const Section1 = mongoose.models.section1 || mongoose.model("section1", section1Model);
export const Section2 = mongoose.models.section2 || mongoose.model("section2", section2Model);
export const Section3 = mongoose.models.section3 || mongoose.model("section3", section3Model);
export const Section4 = mongoose.models.section4 || mongoose.model("section4", section4Model);
export const Section5 = mongoose.models.section5 || mongoose.model("section5", section5Model);
export const Section6 = mongoose.models.section6 || mongoose.model("section6", section6Model);
export const Section7 = mongoose.models.section7 || mongoose.model("section7", section7Model);
export const Section8 = mongoose.models.section8 || mongoose.model("section8", section8Model);
export const Section9 = mongoose.models.section9 || mongoose.model("section9", section9Model);
export const Section10 = mongoose.models.section10 || mongoose.model("section10", section10Model);
export const Section11 = mongoose.models.section11 || mongoose.model("section11", section11Model);
export const Section12 = mongoose.models.section12 || mongoose.model("section12", section12Model);
export const Section13 = mongoose.models.section13 || mongoose.model("section13", section13Model);
export const Section14 = mongoose.models.section14 || mongoose.model("section14", section14Model);

// module.exports = { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14 };