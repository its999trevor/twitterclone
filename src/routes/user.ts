import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router= express.Router();
import { createJwtToken,verifyToken } from "../utils/auth";

const cloudinary=require('cloudinary').v2;


router.post("/",async(req,res)=>{
// console.log(req.body);
const {id,fullname ,email,password}= req.body;
let response=await prisma.user.create({
    data:{
        id,fullname,email,password
    }
})
let token= createJwtToken(response); 
res.cookie("AUTH_TOKEN",token,{
    path: '/',
   });
// console.log(response);
res.status(200).send("user added");

})
router.get("/allprofiles", verifyToken, async (req, res) => {
    const userid = req.user.id;
    let users = await prisma.user.findMany({
        where: {
            id: {
                not: userid 
            }
        },
        take: 3 
    });
    res.send({ users });
});
router.get("/currentuser", verifyToken, async (req, res) => {
    const userid = req.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userid
        }
    });
    res.send({ user });
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const { fullname, bio, pfp, cover } = req.body;
        
        const userId = req.user.id;
        const pfpResult = pfp ? await cloudinary.uploader.upload(pfp, {
            folder: "profile_pictures",
            public_id: `${userId}_pfp`
        }) : null;
        const coverResult = cover ? await cloudinary.uploader.upload(cover, {
            folder: "cover_photos",
            public_id: `${userId}_cover`
        }) : null;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                fullname,
                bio,
                pfp:pfpResult.url,
                cover:coverResult.url 
            }
        });
                res.send("ok");
        // res.status(200).json(updatedUser);
    } catch (error) {
        // Handle errors
        console.error("Error updating user information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/profile",verifyToken,async(req,res)=>{
    try {
        const userId = req.user.id;
        
        const tweetsByUser = await prisma.tweet.findMany({
            where: { userid: userId },
            include: { user: true }
        });

        const retweetsByUser = await prisma.retweet.findMany({
            where: { retweetby: userId },
            include: { 
                tweet: {
                    include: { user: true }
                }
            }
        });

        const combinedResults = [
            ...tweetsByUser.map(tweet => ({
                ...tweet,
                type: 'tweet'
            })),
            ...retweetsByUser.map(retweet => ({
                ...retweet.tweet,
                type: 'retweet',
                originalTweet: retweet.tweet,
                retweetedBy: retweet.retweetby
            }))
        ];

        combinedResults.sort((a, b) => (new Date(b.createdat) as any) -( new Date(a.createdat)as any) );

        res.status(200).json(combinedResults);
    } catch (error) {
        console.error("Error fetching tweets by user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
router.get("/:username",async(req,res)=>{
    const {username} = req.body;
    let users=await prisma.user.findMany({
        where:{
            OR:[
               {
                fullname:{
                    contains:username
                }
               }
            ]
        }
       
    })
    // console.log({users});
})
router.delete("/:id",verifyToken,async(req,res)=>{
     const {id} = req.body;
     if(id!=req.user.id) return res.send("not a valid request");
    let result= await prisma.user.delete({
           where:{
            id
           }
    })
    res.send("user deleted");
})
router.put("/:id",verifyToken,(req,res)=>{

})

export default router;