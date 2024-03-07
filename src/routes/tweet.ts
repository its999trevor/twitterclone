import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();


router.post("/",verifyToken,async(req,res)=>{
    const {title,content} =req.body;
    const userid= req.user.id;
    let result=await prisma.tweet.create({
        data:{
            content,
            userid
        }
    })
    console.log(result);
    res.send({result:result});
})

router.get("/",verifyToken,async (req,res) => {
   let tweets= await prisma.tweet.findMany({
    include:{
        user:true  
    }
    })

    console.log(tweets)
    res.send(tweets);
})
router.get("/:id",verifyToken,async (req,res) => {
    let id=req.params
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
