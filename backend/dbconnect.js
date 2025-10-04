const mongoose = require("mongoose")

const dbconnect = async function(){

    try{
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("db connected")
    }
    catch(err){
       console.log("db connection err")
    }
}

module.exports = dbconnect