const mongoose = require("mongoose");

export const projectModel = mongoose.Schema({
    year: String,
    projectName: String,
    description: String,
    type: String,
    startDate: Date,
    endDate: Date,
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const Project = mongoose.models.projects || mongoose.model("projects", projectModel);
