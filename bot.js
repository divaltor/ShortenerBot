const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');

const bot = new Telegraf(process.env.TOKEN);

const { get_link, get_result } = require('./modules');


bot.start(async (ctx) => {
    await ctx.reply('Отправьте ссылку формата https://example.com')
});

bot.hears(/^(https?:\/\/[^\s]+)$/, async (ctx) => {
    const resp = await get_link(ctx.message.text).catch(e => console.log(e));
    console.log(resp.data);
    await ctx.reply(`Short link: ${resp.data.id}`, Extra.webPreview(false));
});


bot.inlineQuery(/^(.+)$/, async (ctx) => {
    if (ctx.inlineQuery.query.match(/^(https?:\/\/[^\s]+)$/)) {
        const resp = await get_link(ctx.inlineQuery.query).catch(e => console.log(e));
        const result = resp && resp.data ? get_result(resp.data.id) : get_result('null');
        await ctx.answerInlineQuery(result);
    }

});

bot.on('text', reply('error'));

bot.launch();