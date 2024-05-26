import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();
router.post("/:id",verifyToken,async (req,res) => {
    try{
        const {id}=req.params;
        // console.log(id);
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
       let newlike= await prisma.like.create({
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
    // res.send(newlike);
    res.send("liked");
    }catch(err){
        res.send(err);
    }
})


router.get("/:id",verifyToken,async(req,res)=>{
    const {id} = req.params
  let like= await prisma.like.findMany({
        where:{
            tweetid:Number(id)
        },
        select:{
            user:true
        }

    })
    res.send({like});
})


router.get("/:id/isLiked", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        let like = await prisma.like.findFirst({
            where: {
                tweetid: Number(id),
                userid: userid
            }
        });
        if (like != null) {
            return res.json({ isLiked: true });
        } else {
            return res.json({ isLiked: false });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router