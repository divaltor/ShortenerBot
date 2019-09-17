const path = require('path');
const { get_link, get_result } = require('./modules');

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const { reply, TelegrafI18n }= require('telegraf-i18n');

const i18n = new TelegrafI18n({
    useSession: true,
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    directory: path.resolve(__dirname, 'locales')
});

const bot = new Telegraf(process.env.TOKEN);

bot.use(session());
bot.use(i18n.middleware());

bot.start(async (ctx) => {
    await ctx.reply(`${ctx.i18n.t('start')}`)
});

bot.hears(/^(https?:\/\/[^\s]+)$/, async (ctx) => {
    const body = await get_link(ctx.message.text).catch(e => console.log(e));
    await ctx.reply(`Short link: ${body}`);
});

bot.inlineQuery(/^(https?:\/\/[^\s]+)$/, async (ctx) => {
    const body = await get_link(ctx.match[0]).catch(e => console.log(e));
    const result = get_result(ctx, body.id);
    await ctx.answerInlineQuery(result);
});

bot.on('text', reply('error'));

bot.launch();