"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMod = void 0;
class ConfigMod {
    static urll = "mongodb+srv://nauryzbekdias2:Barcelona2603@disa.giygccp.mongodb.net/?retryWrites=true&w=majority";
    static bot = '6637208860:AAElgzEm6XcbygbY7L-qiShbbAGd4DIFu3g';
    static redis = 'redis://127.0.0.1:6379';
    static async getDbUrl() {
        return ConfigMod.urll;
    }
    static async getBotUrl() {
        return ConfigMod.bot;
    }
    static getRedisUrl() {
        return ConfigMod.redis;
    }
}
exports.ConfigMod = ConfigMod;
//# sourceMappingURL=index.js.map