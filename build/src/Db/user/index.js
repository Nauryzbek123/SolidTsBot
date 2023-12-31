"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    functionalgrade: {
        type: Number,
        default: 0,
    },
    uiuxgrade: {
        type: Number,
        default: 0,
    },
    codegrade: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const users = mongoose_1.default.model('Users', usersSchema);
exports.default = users;
//# sourceMappingURL=index.js.map