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
const auth_1 = require("../utils/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const prisma = new client_1.PrismaClient();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dauvmdozh',
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
router.post("/", upload.single('file'), auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const { content } = req.body;
        const userid = req.user.id;
        const file = req.body.file;
        const filetype = req.body.filetype;
        // console.log(req.?file)
        // console.log("req body",req.body.file)
        if (file) {
            let rst;
            if (filetype.startsWith('image/')) {
                rst = yield cloudinary.uploader.upload(file, { public_id: 'flag' });
            }
            else if (filetype.startsWith('video/')) {
                rst = yield cloudinary.uploader.upload_large(file, { resource_type: "video", public_id: 'flag' });
            }
            else {
                res.send("file does not exist");
            }
            let result = yield prisma.tweet.create({
                data: {
                    content,
                    filepath: rst.url,
                    userid
                }
            });
            return res.send({ result: result });
        }
        else {
            let result = yield prisma.tweet.create({
                data: {
                    content,
                    userid
                }
            });
            return res.send({ result: result });
        }
        // console.log(result);
    }
    catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send({ error: 'Internal server error' });
    }
}));
router.get("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tweets = yield prisma.tweet.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdat: 'desc'
        }
    });
    // console.log(tweets)
    res.send(tweets);
}));
router.get("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let tweets = yield prisma.tweet.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: true
        }
    });
    console.log(tweets);
    res.send(tweets);
}));
router.delete("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params;
    let tweets = yield prisma.tweet.delete({
        where: {
            id: Number(id)
        }
    });
    console.log(tweets);
    res.send(tweets);
}));
exports.default = router;
