"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorHandler = AppErrorHandler;
function AppErrorHandler(err, req, res) {
    res.status(500).send("Server Error");
    return;
}
