const express= require("express");

const {PostModel}= require("../models/post.model");

const postRouter= express.Router();

postRouter.get("/:id",async(req,res)=>{
    const ID= req.params.id;
    const {device}= req.query;
    let query={userID:ID};

    if(device){
        query.device=device;
    }

    try {
        const data= await PostModel.find(query);
        console.log("Notes has been sent.");
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send({"msg":"Something went wrong."})
    }
});

postRouter.post("/create",async(req,res)=>{
    const data= req.body;
    try {
        const new_post= new PostModel(data);
        await new_post.save();
        res.send("Created")
    } catch (error) {
        console.log(err);
        res.send({"msg":"Something went wrong."})
    }
});

postRouter.patch("/update/:id",async(req,res)=>{
    const data= req.body;
    const ID= req.params.id;
    const post= await PostModel.findOne({_id:ID});
    const post_userId= post.userID;
    const user_userID= req.body.userID;

    try {
        if(post_userId != user_userID){
            res.send({"msg":"You are not authorized."});
        }
        else{
            await PostModel.findByIdAndUpdate({_id:ID},data);
            console.log("Updated");
            res.send("Updated");
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"Something went wrong."})
    }

});


postRouter.delete("/delete/:id",async(req,res)=>{
    const data= req.body;
    const ID= req.params.id;
    const post= await PostModel.findOne({_id:ID});
    const post_userId= post.userID;
    const user_userID= req.body.userID;

    try {
        if(post_userId != user_userID){
            res.send({"msg":"You are not authorized."});
        }
        else{
            await PostModel.findByIdAndDelete({_id:ID});
            console.log("Deleted");
            res.send("Deleted");
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"Something went wrong."})
    }

});



module.exports={
    postRouter
}