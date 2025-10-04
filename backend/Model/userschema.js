const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userschema = new mongoose.Schema({
    name:{ type: String , required : true},
    email :{ type:String , required: true , unique:true},
    password:{type:String,required:true},
    gender:{type: String, enum:["male","female"]},
    address:{type:String},
    image:{type:String}
})


userschema.pre("save",async function(next){
    
    if(!this.isModified("password")) return next();
 
    this.password = await bcrypt.hash(this.password,10);
    next()

})

userschema.methods.cmppass = async function(password){
     
   return await bcrypt.compare(password,this.password)
}

const usermodel = mongoose.model("user",userschema)

module.exports = usermodel