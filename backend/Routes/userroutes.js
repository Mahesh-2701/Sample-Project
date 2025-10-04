const express = require("express")
const userschema = require("../Model/userschema");
const uploads = require("../multer");
const joi = require("joi")

const Router = express.Router();

const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = function(req,res,next){
      
    let token = req.headers["authorization"]
    let tokenonly = token && token.split(" ")[1];

    if(tokenonly){

        jwt.verify(tokenonly,process.env.SECRETKEY,(err,payload)=>{
            if(err) return res.status(400).json({message:"Invaild or Expired Token"})

                req.user = payload;
        })
    }
    else{
      return res.status(400).json({message:"Token not Found"})
    }

    next()
}

Router.post("/signin",uploads.single("image"),async(req,res)=>{

    let uservalidate = joi.object({
        name:joi.string().alphanum().min(5).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(30).required(),
        gender:joi.string(),
        address:joi.string(),
    })
    
    let user = {...req.body}

    let file = req.file ? "/uploads/"+req.file.filename : null

    const {value,error} = uservalidate.validate(user,{
        abortEarly:false,
        convert:true
    })

    if(error){
        return res.status(400).json( { message : error.details[0].message} )
    }

    try{
        await userschema.create({...user,image:file})
        res.status(200).json({message:"success"})
    }
    catch(err){
       res.status(500).json({message:"failed " +err.message})
    }

})

Router.post("/login",async(req,res)=>{
   
    let password = req.body.password;
    let email = req.body.email;

   try{
      
      let result =await userschema.findOne({email:email})

      if(result){

        let passcheck =await result.cmppass(password)
           
        if(passcheck){
           
            const token = jwt.sign({email:result.email,id:result._id},process.env.SECRETKEY,{expiresIn:"6h"})

            res.status(200).json({message:"login success",token:token,id:result._id,email:result.email})
        }
        else{
          res.status(400).json({message:"invalid password credentials"})
        }

      }
      else{
        res.status(400).json({message:"invalid email credentials"})
      }
   }
   catch(err){
       res.status(400).json({message:"server error"+err.message})
   }

})

Router.get("/index/:id",auth,async(req,res)=>{

    let id = req.params.id
    
    try{
        let result = await userschema.findById(id)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = Router