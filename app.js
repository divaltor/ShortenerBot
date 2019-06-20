require('dotenv').config({path: `${__dirname}/.env`});
const path = require('path');
const send_bit = require('./modules/sendBit');

const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const { reply, TelegrafI18n }= require('telegraf-i18n');
const RedisSession = require('telegraf-session-redis');
const getResult = require('./modules/inline');

const i18n = new TelegrafI18n({
    useSession: true,
    defaultLanguage: 'en',
    defaultLanguageOnMissing: true,
    directory: path.resolve(__dirname, 'locales')
});

const session = new RedisSession({
    store: {
        host: process.env.SESSION_HOST || '127.0.0.1',
        port: process.env.SESSION_PORT
    }
});

const bot = new Telegraf(process.env.TOKEN);

bot.use(session);
bot.use(i18n.middleware());
// bot.use(() => console.log('ok'));

bot.start((ctx) => {
    ctx.reply(`${ctx.i18n.t('start')}`)
});

bot.hears(/(https?:\/\/[^\s]+)/, async (ctx) => {
    console.log(`In private chat: ${ctx.i18n.locale()}`);
    const body = await send_bit(ctx.message.text).catch(e => console.log(e));
    console.log(body);
    ctx.reply(`${ctx.i18n.t('short')}: ${body.id}`,
        Markup.inlineKeyboard([
            Markup.switchToChatButton(ctx.i18n.t('switch'), body.id)
        ]).extra({ disable_web_page_preview: true })
    )
});

bot.inlineQuery(/^(https?:\/\/[^\s]+)$/, async (ctx) => {
    console.log(`Inline mode: ${ctx.i18n.locale()}`);
    const body = await send_bit(ctx.match[0]).catch(e => console.log(e));
    const result = getResult(ctx, body.id);
    ctx.answerInlineQuery(result);
});

bot.inlineQuery(/^(bit.ly[^\s]+)$/, (ctx) => {
    const result = getResult(ctx, ctx.match[0]);
    return ctx.answerInlineQuery(result);
});

bot.command('language', ctx => {
    if (ctx.i18n.locale() === 'ru') {
        ctx.i18n.locale('en');
    } else {
        ctx.i18n.locale('ru');
    }
    ctx.reply(`You locales is ${ctx.i18n.locale()}`);
});

bot.on('text', reply('error'));

bot.launch();