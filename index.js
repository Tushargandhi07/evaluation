const express= require("express");
const {connection}= require("./configs/db");
const {userRouter}= require("./routes/user.route");
const {postRouter}= require("./routes/post.route");
const {authenticate}= require("./middlewares/authenticate.middleware")

const app=express();
app.use(express.json());
const port= 3550;

app.get("/",(req,res)=>{
    res.send("Welcome");
});

app.use("/users",userRouter);

app.use(authenticate);
app.use("/posts",postRouter);

app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error while connecting to DB");
        console.log(err)
    }
    console.log("Server is running.");
});