const jwt = require("jsonwebtoken");

const authenticate= async (req,res,next)=>{
    const token = req.headers.authorization;

    if(token){
        const decode_token= await jwt.verify(token,"eval");
        if(decode_token){
            const userID= decode_token.userID;
            req.body.userID= userID;
            next();
        }
        else{
            res.send("Login First.");
        }
    }
    else{
        res.send("Login First.")
    }
}

module.exports={
    authenticate
}