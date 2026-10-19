const mongo = require("mongoose");

const connect  = async() =>{
    try{
        await mongo.connect("mongodb://admin:admin@localhost:27017/user?authSource=admin");
        console.log("conneted");
    } catch(error){
        console.log(error);
    }
}

module.exports = connect;