const express = require("express");
const db = require("./conflig/db.js");
const {body , validationResult } = require("express-validator");
const userSchema = require("./models/user.model.js");
const User = require("./models/user.model.js");
const app = express();
db();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/user", async(req,res)=>{
    const data = await userSchema.find();
    // if()

    res.render("user",{userData:data});

    
});

app.get("/user-registor",(req,res)=>{
    const errorData = [];
    res.render("user-registor",{Error:errorData});
});

app.post("/user-registor",[
    body("email")
    .notEmpty().withMessage("Enter email"),
    body("password")
    .notEmpty().withMessage("Enter password")
], async(req,res)=>{
    const errorData = validationResult(req);

    if(!errorData.isEmpty()){
        return res.render("user-registor",{Error:errorData.array()});
    }

    const {email , password } = req.body;

    // console.log(email + password);

    const createdUser = new User({
        email:email,
        password:password
    });

    await createdUser.save();
    const data = await userSchema.find();
    
    res.render("user",{userData:data});
});



app.listen("8000",()=>{
    console.log("localhost:8000");
});