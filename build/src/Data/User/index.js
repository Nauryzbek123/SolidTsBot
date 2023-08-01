"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdd = exports.allUs = exports.find = exports.save = void 0;
const user_1 = __importDefault(require("../../db/user"));
async function save(user) {
    const newUser = new user_1.default(user);
    await newUser.save();
}
exports.save = save;
async function find(user) {
    return await user_1.default.findOne({ username: user });
}
exports.find = find;
async function allUs({}) {
    return await user_1.default.find({});
}
exports.allUs = allUs;
async function findByIdd(userid) {
    return await user_1.default.findById(userid);
}
exports.findByIdd = findByIdd;
//# sourceMappingURL=index.js.map