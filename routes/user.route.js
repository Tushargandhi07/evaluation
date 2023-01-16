const express = require("express");

const {UserModel}= require("../models/user.model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}= req.body;
    try {
        bcrypt.hash(password , 5, async(err, hash_pass)=>{
            if(err){
                console.log(err);
            }
            else{
                const user = new UserModel({name,email,gender,password:hash_pass});
                await user.save();
                res.send("Successful Registered.")
            }
        })
    } catch (err) {
        console.log("Error while registeration.")
        console.log(err);
        res.send({"msg":"Error while registeration."})
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email , password} = req.body;

    try {
        const user = await UserModel.find({email});
        const hash_password= user[0].password;

        if(user.length>0){
            bcrypt.compare(password,hash_password,(err, data)=>{
                if(data){
                    const token= jwt.sign({userID: user[0]._id},"eval");
                    res.send({"msg":"Logged in","token":token});
                }
                else{
                    res.send("Wrong Credentials.")
                }
            })
        }
        else{
            res.send("Wrong Credentials")
        }
    } catch (err) {
        console.log("Error while logged in.")
        console.log(err);
        res.send({"msg":"Error while logged in."})
    }
})

module.exports={
    userRouter
}
