import { Telegraf, Markup } from 'telegraf';
import axios from 'axios';

import { helpText } from './constants';
import params from './params';
import welcomeActions from './welcomeActions';
import getText from './getText';
import isString from './isString';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.telegram.setWebhook(
  `${process.env.HEROKU_APP_URL}/bot${process.env.BOT_TOKEN}`
);
// @ts-ignore
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);

bot.start((ctx) =>
  ctx.reply(
    'Welcome stranger. This is a bot specially build for you to see your current weather. \n\nType /help to see all the available actions. \n\nType a city name or click on a predefined city below:',
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.callback('London', 'london'),
        Markup.button.callback('New York', 'new york'),
        Markup.button.callback('Bucharest', 'bucharest'),
        Markup.button.callback('Paris', 'paris'),
      ]),
    }
  )
);

bot.action(welcomeActions, (ctx) => {
  axios
    .get(process.env.WEATHER_API || '', {
      params: {
        ...params,
        appid: process.env.WEATHER_KEY,
        q: ctx.update.callback_query.data,
      },
    })
    .then((current) => {
      return ctx.reply(getText(current.data));
    })
    .catch((_error) => {
      return ctx.reply(helpText);
    });
});

bot.help((ctx) => {
  return ctx.reply(
    'Here is a full list of available actions:\n/start - start from the beginning\n/quit - leave chat'
  );
});

bot.command('quit', (ctx) => {
  ctx.leaveChat();
});

bot.on('text', (ctx) => {
  if (isString(ctx.message.text)) {
    axios
      .get(process.env.WEATHER_API || '', {
        params: {
          ...params,
          appid: process.env.WEATHER_KEY,
          q: ctx.message.text,
        },
      })
      .then((current) => {
        return ctx.reply(getText(current.data));
      })
      .catch((_error) => {
        return ctx.reply(helpText);
      });
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
