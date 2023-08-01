//"/Users/diasnauryzbek/Desktop/TgBotClear/src/Domains/config/index.ts";

import { initDatabase } from "./db/init_database";
import { runBot } from "./domains/user";

async function startBot() {
    try{
        await initDatabase();
        await runBot();
    }catch(err){
        console.error(err);
    }   
}

startBot();


