import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
import multer from 'multer';
import path from 'path';
const router= express.Router();



    const storage = multer.diskStorage({
        destination: function (req, file:any, cb) {
            cb(null, 'uploads');
        },
        filename: function (req:any, file:any, cb:any) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix  + path.extname(file.originalname));
        }
    });
    
 const upload = multer({ storage: storage });



const prisma = new PrismaClient()
const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dauvmdozh',
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

  

router.post("/",upload.single('file'),verifyToken,async(req,res)=>{
    try{
        // console.log(req.body);
    const {content} =req.body;
    const userid= req.user.id;
    const file=req.body.file;
    const filetype=req.body.filetype;



    // console.log(req.?file)
    // console.log("req body",req.body.file)
    if(file){
    
    let rst;
    if(filetype.startsWith('image/')){
    rst= await cloudinary.uploader.upload(file,
        {public_id: 'flag' });
    }else if(filetype.startsWith('video/')){
         rst= await cloudinary.uploader.upload_large(file,
            { resource_type: "video",public_id: 'flag' });
    }
    else{
        res.send("file does not exist");
    }

        let result=await prisma.tweet.create({
            data:{
                content,
                filepath:rst.url,
                userid
            }
        })
        return res.send({result:result});
    }else{
        let result=await prisma.tweet.create({
            data:{
                content,
                userid
            }
        })
        return res.send({result:result});
    }
    // console.log(result);
}
catch(err){
    console.error('Error uploading file:', err);
    return res.status(500).send({ error: 'Internal server error' });
}
})

router.get("/",verifyToken,async (req,res) => {
   let tweets= await prisma.tweet.findMany({
    include:{
        
            user:true  
        
    },
    orderBy:{
        createdat: 'desc'
    }
    })

    // console.log(tweets)
    res.send(tweets);
})
router.get("/:id",verifyToken,async (req,res) => {
    let {id}=req.params
    let tweets= await prisma.tweet.findUnique({
        where:{
            id:Number(id)
        },
        include:{
            user:true  
        }
    })
    console.log(tweets)
    res.send(tweets);
})
router.delete("/:id",verifyToken,async (req,res) => {
    let id=req.params
    let tweets= await prisma.tweet.delete({
        where:{
            id:Number(id)
        }
    })
    console.log(tweets)
    res.send(tweets);
})

export default router
