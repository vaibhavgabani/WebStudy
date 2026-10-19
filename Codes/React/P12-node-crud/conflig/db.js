const mongo = require("mongoose");

const connect = async() => {
    try{
        await mongo.connect("mongodb://admin:admin@localhost:27017/mydatabase?authSource=admin");
        console.log("db is conneted...");
    } catch(error){
        console.log("Error in Connection : "+error);
    }
}

module.exports = connect;