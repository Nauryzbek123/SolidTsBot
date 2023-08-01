"use strict";
//"/Users/diasnauryzbek/Desktop/TgBotClear/src/Domains/config/index.ts";
Object.defineProperty(exports, "__esModule", { value: true });
const init_database_1 = require("./db/init_database");
const user_1 = require("./domains/user");
async function startBot() {
    try {
        await (0, init_database_1.initDatabase)();
        await (0, user_1.runBot)();
    }
    catch (err) {
        console.error(err);
    }
}
startBot();
//# sourceMappingURL=bot.js.map