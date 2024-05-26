import  express   from "express";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import twittRoute from "./routes/tweet";
import likeRoute from "./routes/like"
import retweetRoute from "./routes/retweet";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
const port=3000;
const app=express();



app.use('/uploads', express.static(path.join(__dirname,"uploads")));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' })); // Increase the paylo..ad size limit
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


//routes
app.use("/user", userRoute);
app.use("/login",loginRoute)
app.use("/tweet",twittRoute);
app.use("/like",likeRoute);
app.use("/retweet",retweetRoute);

app.listen(port,()=>{
    console.log(`https://localhost:${port}`)
})
