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
const user_1 = __importDefault(require("./routes/user"));
const login_1 = __importDefault(require("./routes/login"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'hbs');
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('home');
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render("home");
});
//routes
app.use("/user", user_1.default);
app.use("/twitt", tweet_1.default);
app.use("/login", login_1.default);
app.listen(port, () => {
    console.log(`https://localhost:${port}`);
});
