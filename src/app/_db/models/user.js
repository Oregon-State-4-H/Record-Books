const mongoose = require("mongoose");

export const userModel = mongoose.Schema({
    email: String,
    birthdate: Date,
    first_name: String,
    middle_name_initial: String,
    last_name_initial: String,
    county_name: String,
    join_date: Date,
    bookmarks: Array,
});
 
export const User = mongoose.models.users || mongoose.model("users", userModel);