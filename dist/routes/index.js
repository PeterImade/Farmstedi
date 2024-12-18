"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
// Routes 
const user_route_1 = __importDefault(require("../user/user.route"));
function routes(app) {
    (0, user_route_1.default)(app);
}
