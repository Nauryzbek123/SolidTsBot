"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBot = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const User_1 = require("../../data/User");
const job_1 = require("./job");
async function runBot() {
    try {
        const botUrl = await config_1.ConfigMod.getBotUrl();
        const bot = new telegraf_1.Telegraf(botUrl);
        bot.use((0, telegraf_1.session)());
        const getRedisUrl = async () => {
            const redisUrl = await config_1.ConfigMod.getRedisUrl();
            return Number(redisUrl);
        };
        // Start bot session
        bot.start(async (ctx) => {
            try {
                const existingUser = await (0, User_1.find)(ctx.from?.username ?? "");
                if (existingUser) {
                    job_1.queue.add({
                        id: ctx.from.id.toString(),
                        message: "test "
                    });
                    ctx.reply("Вы уже были добавлены в список", {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Список стажеров", callback_data: "show_users" }],
                            ],
                        },
                    });
                }
                else {
                    job_1.queue.add({
                        id: ctx.from?.id?.toString() ?? "",
                        message: "addUser",
                    });
                    ctx.reply("Подождите немного...");
                }
            }
            catch (err) {
                console.log(err);
                ctx.reply("Не удалось загрузить");
            }
        });
        job_1.queue.process(async (job, done) => {
            console.log(job);
            try {
                const existingUser = await (0, User_1.find)(job.data.id);
                if (!existingUser) {
                    (0, User_1.save)(job.data.id);
                    const user = await (0, User_1.find)(job.data.id);
                    if (user) {
                        bot.telegram.sendMessage(job.data.id, "Вы были добавлены в список", {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Список стажеров", callback_data: "show_users" }],
                                ],
                            },
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        //list of users 
        bot.action('show_users', async (ctx) => {
            try {
                const allUsers = await (0, User_1.allUs)({});
                console.log(allUsers);
                if (allUsers.length === 0) {
                    return ctx.reply('Список стажеров пуст');
                }
                const userListButtons = allUsers.map((user) => {
                    return [{ text: `${user.username} `, callback_data: `user-${user._id}` }];
                });
                ctx.reply('Список стажеров', {
                    reply_markup: {
                        inline_keyboard: userListButtons
                    }
                });
            }
            catch (err) {
                ctx.reply('Ошибка при получении списка стажеров ');
            }
        });
        //detail info about user 
        bot.action(/^user-(\S+)$/, async (ctx) => {
            try {
                const userId = ctx.match[1];
                const selectedUser = await (0, User_1.findByIdd)(userId);
                //await users.findById(userId); 
                if (!selectedUser) {
                    return ctx.reply('Пользователь не найден');
                }
                const userDetails = `Имя пользователя: ${selectedUser.username}\n`
                    + `Оценка функциональности: ${selectedUser.functionalgrade}\n`
                    + `Оценка UI/UX: ${selectedUser.uiuxgrade}\n`
                    + `Оценка кода: ${selectedUser.codegrade}`;
                ctx.reply(userDetails, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Поставить оценку", callback_data: `postGr-${userId}` }],
                        ],
                    },
                });
            }
            catch (err) {
                console.log(err);
                ctx.reply('Ошибка при получении информации о пользователе');
            }
        });
        const ratingList = [
            [{ text: "Рейтинг стажеров", callback_data: "show_rating" }]
        ];
        bot.action(/^postGr-(\S+)$/, async (ctx) => {
            try {
                const userId = ctx.match[1];
                const selectedUser = await (0, User_1.findByIdd)(userId);
                if (!selectedUser) {
                    return ctx.reply('Пользователь не найден');
                }
                ctx.session = {};
                ctx.session.currentStep = 'functionalgrade';
                ctx.session.selectedUser = selectedUser;
                ctx.reply('Введите оценку функциональности (от 1 до 10):');
            }
            catch (err) {
                console.log(err);
                ctx.reply('Ошибка при получении информации о пользователе');
            }
        });
        bot.on('text', async (ctx) => {
            try {
                if (!ctx.session) {
                    ctx.session = {};
                }
                const step = ctx.session.currentStep;
                if (!step) {
                    return;
                }
                const rating = parseInt(ctx.message.text.trim());
                if (isNaN(rating) || rating < 1 || rating > 10) {
                    ctx.reply("Пожалуйста,введите валидную оценку");
                    return;
                }
                if (step === 'functionalgrade') {
                    ctx.session.functionalgrade = rating;
                    ctx.session.currentStep = 'uiuxgrade';
                    ctx.reply('Введите оценку UI/UX (от 1 до 10):');
                }
                else if (step === 'uiuxgrade') {
                    ctx.session.uiuxgrade = rating;
                    ctx.session.currentStep = 'codegrade';
                    ctx.reply('Введите оценку кода (от 1 до 10):');
                }
                else if (step === 'codegrade') {
                    ctx.session.codegrade = rating;
                    const functionalgrade = ctx.session.functionalgrade;
                    const uiuxgrade = ctx.session.uiuxgrade;
                    const codegrade = ctx.session.codegrade;
                    const selectedUser = ctx.session.selectedUser;
                    selectedUser.functionalgrade = functionalgrade;
                    selectedUser.uiuxgrade = uiuxgrade;
                    selectedUser.codegrade = codegrade;
                    await selectedUser.save();
                    delete ctx.session.functionalgrade;
                    delete ctx.session.uiuxgrade;
                    delete ctx.session.codegrade;
                    delete ctx.session.currentStep;
                    delete ctx.session.selectedUser;
                    ctx.reply('Оценки успешно сохранены.');
                    const allUsers = await (0, User_1.allUs)({});
                    const ratedUsers = allUsers.map((user) => {
                        const totalGrade = user.functionalgrade + user.uiuxgrade + user.codegrade;
                        return {
                            username: user.username,
                            totalGrade,
                        };
                    });
                    ratedUsers.sort((a, b) => b.totalGrade - a.totalGrade);
                    let replyMessage = 'Рейтинг стажеров:\n';
                    for (let index = 0; index < ratedUsers.length; index++) {
                        const ratedUser = ratedUsers[index];
                        replyMessage += `${index + 1}. ${ratedUser.username}: ${ratedUser.totalGrade}\n`;
                    }
                    ctx.reply(replyMessage);
                }
            }
            catch (err) {
                console.log(err);
                ctx.reply('Ошибка при обработке оценки');
            }
        });
        bot.launch();
    }
    catch (err) {
        console.log(err);
    }
}
exports.runBot = runBot;
//# sourceMappingURL=index.js.map