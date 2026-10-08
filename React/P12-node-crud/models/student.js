const mongo = require("mongoose");

const StudentSchema = new mongo.Schema({
    rollno : {
        type : String
    },
    name : {
        type : String
    }
});

const Student = mongo.model("Students",StudentSchema);

module.exports = Student;