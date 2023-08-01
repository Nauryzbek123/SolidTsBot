import { ConfigMod } from "../domains/config";
const mongoose = require('mongoose')

export const initDatabase = async () => {
    const dburl = await ConfigMod.getDbUrl();
    await mongoose.connect(dburl , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
};

module.exports = {initDatabase}