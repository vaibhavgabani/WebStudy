const express = require("express");
const {body , validationResult, ExpressValidator} = require("express-validator");
const multer = require("multer");
const app = express();
const uplord = multer({"dest":"uplords"});

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("sfsdf");
});

app.get("/data",(req,res)=>{
    res.send("hellow from data");
});

app.post("/data",(req,res)=>{
    const paramsData = req.params;
    const bodyData = req.body;
    console.log(`data from params \({JSON.stringify(paramsData)} , data from body\){JSON.stringify(bodyData)}`);
    
    // Better Express practice: respond with res.json() instead of res.send with string interpolation
    res.json({
        params: paramsData,
        body: bodyData
    });
});

app.get("/student"
    ,(req,res)=>{
    res.render("student");
});

app.post("/student",[
    body("_id")
    .isEmpty().withMessage("id needed...")
    .isNumeric().withMessage("number is neeeded..."),

    body("_email")
    .isEmail().withMessage("Enter email...")
    .isEmpty().withMessage("email is needed..."),

    uplord.fields([{name:"photo",maxCount:1}])
],(req,res)=>{
    const {_id,_name,_email,_password} = req.body;

    const studentData = req.body;
    const Error = validationResult(req);

    console.log(req.files);
    res.render("student",{studentData:studentData,errors:Error.array()});
});
app.listen(8000,()=>{
    console.log("woring on port 8000");
});