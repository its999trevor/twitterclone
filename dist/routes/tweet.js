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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userid = req.user.id;
    let result = yield prisma.tweet.create({
        data: {
            content,
            userid
        }
    });
    console.log(result);
    res.send({ result: result });
}));
router.get("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tweets = yield prisma.tweet.findMany({
        include: {
            user: true
        }
    });
    console.log(tweets);
    res.send(tweets);
}));
router.get("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params;
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
