const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkRlUUJsckt6NU1NUG90MThkYzhBYmxUYmdPN1JrZlNYNnY4VDRsd25VND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEpjb3JZRk9jVkZLQnZMcmE4RzVKRTVqYlVzaDVTV08rSU5KZWNFVEdrVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQ0NPYnlGSHZHempCRUpaTWZiQmZZNDFwbFZUNm1pTy9oVzJwQ1lycWtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3SmdMbEwyTzExTy9RTC9pTGFWWWpNVEZZMkpCZ1E2SUlMY0lrMnpGZ2xnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQUE9ZVGRINlZsaVBuN0s5emQ3WWV6MmlMSlZkeWNLazh3anBIUWVIV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9aT1dJemZCRzA3Qm5vY2FrWTBlbVBkSm9haFJvQk5WNG5vVnEvamVvbms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hzSGFhV3EzZVdEMHJTeEcwQnNGTGlzM0pwRXZYU2k4L1pHWENST1FuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDg3Skh2dWlmejNiTTJaeVM1dkJydEE0VWNBRFB1a2Iyd3cwaXhPWHZVOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii91bm1iT3paYUFGMGVDU2RvaTZWNHpaUGM3OW9menpySTMxbEQxSHNBZzRLYzU2YW56Yzh6UFNMSG1Jc0RmVExrajFYbFZrUy91V3A0Yk5wSy9lSWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6Ik90Um5NQWtqQnJ0YkhTU095eGFZTGliQlhlQlRuUWlGMzhES0tGeXloK0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImU2UXFyanZpUW91WVBxQ2NPLUZvRnciLCJwaG9uZUlkIjoiYmRhNDdiZGEtZWQ2NS00YmQ4LWI1YjYtOTc4ODJkMzlhODZjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhOR3g4eVJPMWZyQ25wbDluUW9iRjdHUGxTaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuMlpyRDFFNU56SWNTeWNxUnVsT0VnblVpS3M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTDc2R0hRMU0iLCJtZSI6eyJpZCI6IjI2MDk3MTgxNjk1Njo3MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYWtvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLK3Bsc2tFRU52N21yUUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5d3RnQXloRXY3bEVkQUFKbDFBTmRPNks0M3lTTzN6UDNEZ0pjS1NPaW13PSIsImFjY291bnRTaWduYXR1cmUiOiJ1ZGRSVDZUS292aHAxU1VuU0xqU2hMNGZoSmtoMTJyQ3d1YTYrUjZIcVpiY1VRMk05b3RjRUFyeVI1eXkzTDh0VUN0bmhjQ2VXU29zOU1ZNnVhc3lEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNkZnNHlmRlVsRnBEQlpTckw1L0ZiVkdBMGRMN1k4ZkxLYUlKWEtNVCtCTUNiWS9vTFI5dlZNM1JwR0FFa09SaUcrUzAwOHhoQllJK3F2NDBsay9JZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjA5NzE4MTY5NTY6NzBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmNMWUFNb1JMKzVSSFFBQ1pkUURYVHVpdU44a2p0OHo5dzRDWENram9wcyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDEwNjQ3M30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KING👑MAKO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "KING👑MAKO",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'KING_MAKO',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
