import jwt from "jsonwebtoken";
import express, {Request,Response, NextFunction } from "express";
const secretKey="opium"
export const createJwtToken=(user: {
    id: string;
    fullname: string;
    email: string;
    password: string;
})=>{
    return jwt.sign(user,secretKey,{expiresIn:"24h"})
}

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    // console.log(req.cookies);
    let token=req.cookies.AUTH_TOKEN;
    let decode=jwt.verify(token,secretKey);
    // console.log(decode);
    if(decode){
        req.user=decode;
       return next();
    }
    res.send("token invalid");
}