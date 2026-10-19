const express = require("express");
const {body,validationResult} = require("express-validator");
const app = express();
const multer = require("multer");
const uplord = multer({dest:"uplords"});

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("hellow from express");
})

app.get("/employee",(req,res)=>{
    res.render("employee");
});

app.post("/employee",
    [
        body("_id")
        .isEmpty().withMessage("id is needed")
        .isNumeric().withMessage("id noly number..."),
        
        body("_name")
        .isEmpty().withMessage("name is needed"),

        uplord.fields([{name:"_photo",maxCount:1}])

    ]
    ,(req,res)=>{
    const employeeData = req.body;
    const error = validationResult(req);
    console.log(req.files);
    res.render("employee",{employeeData:employeeData , error:error.array()});
});
 
app.listen("8000",()=>{
    console.log("localhost:8000");
});