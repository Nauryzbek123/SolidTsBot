"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const config_1 = require("../domains/config");
const mongoose = require('mongoose');
const initDatabase = async () => {
    const dburl = await config_1.ConfigMod.getDbUrl();
    await mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
};
exports.initDatabase = initDatabase;
module.exports = { initDatabase: exports.initDatabase };
//# sourceMappingURL=init_database.js.map