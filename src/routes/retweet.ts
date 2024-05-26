import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();
router.post("/:tweetid",verifyToken,async(req,res)=>{
     const {tweetid}  = req.params
     const userid= req.user.id;
     let retweeted = await prisma.retweet.findFirst({
        where:{
          tweetid: Number(tweetid),
          retweetby: userid
        }
     })   
     if(retweeted!=null){
       return res.send({alredyretweeted:true});
     }
     let result=await prisma.retweet.create({
        data:{
            tweetid:Number(tweetid),
            retweetby:userid
        }
     })
     await prisma.tweet.update({
        where:{
            id:Number(tweetid)
        },
        data:{
            retweetCount:{increment:1}
        }
     })
     res.send({result});

})
router.delete("/:tweetid",verifyToken,async(req,res)=>{
    const {tweetid} = req.params
    console.log(tweetid);
    const userid = req.user.id
   let retweet = await prisma.retweet.findFirst({
          where:{
            tweetid:Number(tweetid),
            retweetby:userid
          }
   })
   console.log(retweet);
   if(retweet){   
    let response=await prisma.retweet.delete({
        where:{
           id:retweet.id,
           retweetby:userid
        }
        })
        
         await prisma.tweet.update({
            where:{
                id: response.tweetid
            },
            data:{
                retweetCount:{decrement:1}
            }
        })
      return  res.send({undo:true})
    } else{

       return res.send("retweet does not exist");
    }

   
 

})

router.get("/:tweetid",verifyToken,async(req,res)=>{
  const { tweetid } = req.params;
  const userid = req.user.id;

  try {
      const retweeted = await prisma.retweet.findFirst({
          where: {
              tweetid: Number(tweetid),
              retweetby: userid
          }
      });

      res.json({ isRetweeted: retweeted != null });
  } catch (err) {
      res.status(500).send(err);
  }
})




export default router