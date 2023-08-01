"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../Domains/config");
async function startBot() {
    try {
        const dburl = await config_1.ConfigMod.getDbUrl();
        console.log(dburl);
        const botIns = await config_1.ConfigMod.getBotUrl();
        console.log(botIns);
    }
    catch (err) {
        console.error(err);
    }
}
startBot();
//# sourceMappingURL=bot.js.map