import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();
router.post(":/",verifyToken,async (req,res) => {
        const {id}=req.params;
        const userid=req.user.id;
        let like=await prisma.like.findFirst({
                where:{
                    tweetid:Number(id),
                    userid:userid
                }
        })
        if(like!=null){
            await prisma.like.delete({
                where:{
                    id:like.id
                }
            })
            await prisma.tweet.update({
                where:{
                    id:Number(id)
                },
                data:{
                    likecount:{decrement:1}
                }
            })
            return res.send("disliked")
        }
        await prisma.like.create({
            data:{
                tweetid:Number(id),
                userid:userid
            }
        })
        await prisma.tweet.update({
            where:{
                id:Number(id)
            },
            data:{
                likecount:{
                    increment:1 
                }
            }
        })
        res.send("like added")
})
