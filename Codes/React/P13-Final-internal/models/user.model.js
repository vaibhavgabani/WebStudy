const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }

});

const User = mongo.model("users",userSchema);

module.exports = User;