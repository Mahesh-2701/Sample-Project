const multer = require("multer")

const path = require("path")

const storage = multer.diskStorage({
    destination : "./uploads",
    filename:(req,file,cb)=>{
        let filename = Date.now()+"_"+ file.originalname
        cb(null,filename)
    }
})

const filefilter= (req,file,cb)=>{

    let allowedtypes = /jpg|jpeg|png/
     
    const extname = allowedtypes.test(path.extname(file.originalname).toLowerCase())

    if(extname){
        cb(null,true)
    }
    else{
        cb(new Error("only images allowed"))
    }

}

const uploads = multer({
    storage:storage,
    limits:{
        fileSize: 2 * 1024 *1024
    },
    fileFilter : filefilter

})

module.exports = uploads