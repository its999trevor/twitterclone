import express from "express";
import { PrismaClient } from '@prisma/client'
import { createJwtToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();


router.post("/",async(req,res)=>{
   const {email,password} = req.body;
  let user= await prisma.user.findUnique({
    where:{
        email
    }
   })
   if(!user){
      return res.send("Not a valid email");
   }
   if(user.password!=password){
      return res.send("Not a valid password");
   }

   let token= createJwtToken(user); 
   res.cookie("AUTH_TOKEN",token,{
      path: '/',
     });
   res.status(200).send("logged in");
   
//alltweets and users
})
router.post("/logout", async (req, res) => {
   // Clear the authentication token cookie from the client's browser
   res.clearCookie("AUTH_TOKEN");
   res.cookie("AUTH_TOKEN","",{expires:new Date(0)});
   res.send("logged out");
});








export default router;