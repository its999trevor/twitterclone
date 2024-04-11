import  express   from "express";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import twittRoute from "./routes/tweet";
import likeRoute from "./routes/tweet";
import cookieParser from "cookie-parser";
import cors from "cors";
const port=3001;
const app=express();
app.set('view engine','hbs');
app.get("/",async (req,res) => {
    res.render('home');
})
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.set("view engine","hbs");
app.get("/",(req,res)=>{
     res.render("home");
})

//routes
app.use("/user", userRoute);
app.use("/twitt",twittRoute);
app.use("/login",loginRoute)
app.use("/like",likeRoute);
app.listen(port,()=>{
    console.log(`https://localhost:${port}`)
})
