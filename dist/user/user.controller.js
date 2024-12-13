"use strict";
/*** MODULES ***/
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
const user_repo_1 = __importDefault(require("./user.repo"));
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    constructor() {
        const userRepo = new user_repo_1.default();
        this.userService = new user_service_1.default(userRepo);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.create(req.body);
                res.status(201).json({ success: true, msg: "signup successful" });
                return;
            }
            catch (err) {
                console.log("App Error");
                res.status(500).json({ success: false, msg: err.message });
                return;
            }
        });
    }
}
exports.default = UserController;
