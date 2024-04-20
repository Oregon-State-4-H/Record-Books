const mongoose = require("mongoose");

export const UserProfile = {
    _id: "",
    email: "",
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
}

export const userModel = mongoose.Schema({
    email: String,
    given_name: String,
    family_name: String,
    birthdate: Date,
});
 
export const User = mongoose.models.users || mongoose.model("users", userModel);



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const UserSchema = Schema({
//     email: String,
//     given_name: String,
//     family_name: String,
//     birthdate: Date,
//   }
// );
  
// const User = mongoose.models.User || mongoose.model("user", UserSchema);

// module.exports = User;