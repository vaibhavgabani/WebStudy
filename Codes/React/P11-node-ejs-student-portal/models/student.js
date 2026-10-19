const mongo = require("mongoose");

const studentSchema = new mongo.Schema(
    {
        rollno : {
            type : Number,
            required : true,
            unique : true
        },

        name : {
            type : String
        },

        course : {
            type : String
        }

    }
);


const Student = mongo.model("Student",studentSchema);


module.exports = Student;