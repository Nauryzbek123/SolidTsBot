

export class ConfigMod{
   private static urll = "mongodb+srv://nauryzbekdias2:Barcelona2603@disa.giygccp.mongodb.net/?retryWrites=true&w=majority";
   private static bot = '6637208860:AAElgzEm6XcbygbY7L-qiShbbAGd4DIFu3g';
   private static redis = 'redis://127.0.0.1:6379';
     
     public static async getDbUrl(){
        return ConfigMod.urll;
     }
     public static async getBotUrl(){
        return ConfigMod.bot;
     } 
     public static  getRedisUrl(): string{
      return ConfigMod.redis;
     }
}