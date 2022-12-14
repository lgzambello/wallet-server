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
const cors_1 = __importDefault(require("cors"));
const PlaidClient_1 = __importDefault(require("../clients/PlaidClient"));
class Server {
    constructor() {
        this.plaidClient = new PlaidClient_1.default();
    }
    // eslint-disable-line
    server() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = express_1.default();
            app.use(express_1.default.json());
            app.use(express_1.default.urlencoded({ extended: true }));
            // define a route handler for the default home page
            app.get("/link-token", (req, res) => __awaiter(this, void 0, void 0, function* () {
                // const id = req.body;
                const linkToken = yield this.plaidClient.getLinkToken("id");
                console.log(linkToken);
                console.log("hehe");
                res.header("Access-Control-Allow-Origin", "*");
                res.send(linkToken);
            }));
            app.use(cors_1.default());
            return app;
        });
    }
}
exports.default = new Server();
//# sourceMappingURL=app.js.map