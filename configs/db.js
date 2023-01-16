const mongoose= require("mongoose");
const connection = mongoose.connect("mongodb+srv://tushar:tushargan@cluster0.8gqmylk.mongodb.net/fullstackeval?retryWrites=true&w=majority");

module.exports={
    connection
}