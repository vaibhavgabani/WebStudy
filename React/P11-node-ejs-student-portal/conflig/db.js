const mongo = require("mongoose");

const connect = async() =>{
    try{
        // console.log(process.env.mongoUrl);
        await mongo.connect(process.env.mongoUrl);
        console.log("mongo connted");

    } catch (error){
        console.log(error);
    }

} 

module.exports = connect;