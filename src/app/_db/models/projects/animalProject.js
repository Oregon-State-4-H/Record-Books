const mongoose = require("mongoose");

export const animalProjectModel = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    
});

export const AnimalProject = mongoose.models.animapProjects || mongoose.model("animalProjects", animalProjectModel);
