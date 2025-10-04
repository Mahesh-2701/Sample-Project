const express = require("express")
require("dotenv").config()
const routes = require("./Routes/userroutes")
const dbconnect = require("./dbconnect");
const multer = require("multer");
const cors = require("cors")

const PORT = process.env.PORT;


const app = express()

app.use(cors())
app.use("/uploads",express.static("./uploads"))
app.use(express.json())
app.use(express.urlencoded())

dbconnect()
app.use(routes)


app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        res.status(400).json({message:err.message})
    }
    else if(err.message){
        res.status(400).json({message:err.message})
    }
    else{
        res.status(400).json({message:"Only jpeg jpg png are allowed"})
    }

    next()
})

app.listen(PORT,()=>{ console.log(`Server running in port ${PORT}`)})