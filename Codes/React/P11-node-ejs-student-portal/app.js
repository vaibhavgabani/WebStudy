const express = require("express");
const env = require("dotenv");
const mongoDb = require("./conflig/db.js");
const studentSchema = require("./models/student.js");
const app = express();

env.config();
mongoDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("asafsdf");
});

app.post("/student",async(req,res)=>{
    const {_rollno , _name , _cource } = req.body;

    const newStudent = new studentSchema(
        {
            rollno : _rollno,
            name : _name,
            cource : _cource
        }
    ); 

    await newStudent.save();
    
    const allStudent = await studentSchema.find();

    res.json({
        rollno : _rollno,
        name : _name,
        cource : _cource,
        allStudent : allStudent

    });
});

app.listen(("8000"),()=>{
    console.log("wokring on port 8000");
});