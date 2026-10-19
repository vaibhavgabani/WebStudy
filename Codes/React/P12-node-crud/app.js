const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const db = require("./conflig/db.js");
const Student = require("./models/student.js");

db();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix: Pass empty arrays initially to prevent EJS from crashing
app.get("/", async (req, res) => {
    const data = await Student.find();
    res.render("student", { errorData: [], data: data });
});

app.get("/student", async (req, res) => {
    const student = new Student({
        rollno: "2",
        name: "kamo"
    }); 
    await student.save();
    const data = await Student.find();
    res.json({ data: data });
});

app.post("/student", [
    body("rollno")
        .notEmpty().withMessage("Enter Rollno")
        .isNumeric().withMessage("Rollno only number"),
    body("name")
        .notEmpty().withMessage("Enter name")
        .isString().withMessage("only String")
], async (req, res) => {
    const { rollno, name } = req.body;
    const errorData = validationResult(req);
    
    let data = await Student.find();

    if (!errorData.isEmpty()) {
        return res.render("student", { errorData: errorData.array(), data: data });
    }

    const newStudent = new Student({
        rollno: rollno,
        name: name
    });

    await newStudent.save();

    data = await Student.find();
    
    res.render("student", { errorData: [], data: data });
});

app.get("/login",(req,res)=>{
    const errorData = [];
    res.render("login",{errorData:errorData});
});


app.post("/login",[
    body("rollno")
    .notEmpty().withMessage("enter rollno"),
    body("name")
    .notEmpty().withMessage("enter name")
],(req,res)=>{
   const {rollno , name } = req.body;
   console.log(rollno + name);
    const errorData = validationResult(req);
    
    if(!errorData.isEmpty()){
        res.render("login",{errorData:errorData.array()});
    }

    res.render("login",{errorData:[]});
});

app.listen("8000", () => {
    console.log("working on localhost:8000");
});