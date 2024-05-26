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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.send("Not a valid email");
    }
    if (user.password != password) {
        return res.send("Not a valid password");
    }
    let token = (0, auth_1.createJwtToken)(user);
    res.cookie("AUTH_TOKEN", token, {
        path: '/',
    });
    res.status(200).send("logged in");
    //alltweets and users
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the authentication token cookie from the client's browser
    res.clearCookie("AUTH_TOKEN");
    res.cookie("AUTH_TOKEN", "", { expires: new Date(0) });
    res.send("logged out");
}));
exports.default = router;
