"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const auth_1 = require("../utils/auth");
const cloudinary = require('cloudinary').v2;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { id, fullname, email, password } = req.body;
    let response = yield prisma.user.create({
        data: {
            id, fullname, email, password
        }
    });
    let token = (0, auth_1.createJwtToken)(response);
    res.cookie("AUTH_TOKEN", token, {
        path: '/',
    });
    // console.log(response);
    res.status(200).send("user added");
}));
router.get("/allprofiles", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.user.id;
    let users = yield prisma.user.findMany({
        where: {
            id: {
                not: userid
            }
        },
        take: 3
    });
    res.send({ users });
}));
router.get("/currentuser", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.user.id;
    const user = yield prisma.user.findUnique({
        where: {
            id: userid
        }
    });
    res.send({ user });
}));
router.put("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, bio, pfp, cover } = req.body;
        const userId = req.user.id;
        const pfpResult = pfp ? yield cloudinary.uploader.upload(pfp, {
            folder: "profile_pictures",
            public_id: `${userId}_pfp`
        }) : null;
        const coverResult = cover ? yield cloudinary.uploader.upload(cover, {
            folder: "cover_photos",
            public_id: `${userId}_cover`
        }) : null;
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: {
                fullname,
                bio,
                pfp: pfpResult.url,
                cover: coverResult.url
            }
        });
        res.send("ok");
        // res.status(200).json(updatedUser);
    }
    catch (error) {
        // Handle errors
        console.error("Error updating user information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/profile", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const tweetsByUser = yield prisma.tweet.findMany({
            where: { userid: userId },
            include: { user: true }
        });
        const retweetsByUser = yield prisma.retweet.findMany({
            where: { retweetby: userId },
            include: {
                tweet: {
                    include: { user: true }
                }
            }
        });
        const combinedResults = [
            ...tweetsByUser.map(tweet => (Object.assign(Object.assign({}, tweet), { type: 'tweet' }))),
            ...retweetsByUser.map(retweet => (Object.assign(Object.assign({}, retweet.tweet), { type: 'retweet', originalTweet: retweet.tweet, retweetedBy: retweet.retweetby })))
        ];
        combinedResults.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        res.status(200).json(combinedResults);
    }
    catch (error) {
        console.error("Error fetching tweets by user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    let users = yield prisma.user.findMany({
        where: {
            OR: [
                {
                    fullname: {
                        contains: username
                    }
                }
            ]
        }
    });
    // console.log({users});
}));
router.delete("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (id != req.user.id)
        return res.send("not a valid request");
    let result = yield prisma.user.delete({
        where: {
            id
        }
    });
    res.send("user deleted");
}));
router.put("/:id", auth_1.verifyToken, (req, res) => {
});
exports.default = router;
