//1785431633
//64
const TGApi = require("node-telegram-bot-api")
const fs = require("fs");

const token = "5433296427:AAG7bj-uy5wXpI0zKQXIUdbNAgb-yyWfsz4"

const bot = new TGApi(token, {polling: true})

const keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[
            {text: 'Понедельник', callback_data: 'Иностранный язык 12:00-13:20'},
            {text: 'Вторник', callback_data: 'УПЗС 09:00-10:20 ФПЗС 10:30-11:50 УППЗС 12:00-13:20'},
            {text: 'Среда', callback_data: 'ГТПЗС 10:30-11:50 ГПЗС 12:00-13:20 МП 15:00-16:20'}],
            [{text: 'Четверг', callback_data: 'ИН-ЯЗ 13:30-14:50 ИН-ЯЗ 15:00-16:20'},
                {text: 'Пятница', callback_data: 'Криминал 15:00-16:20 Арбитраж 16:30-17:50'},
                {text: 'Суббота', callback_data: 'Лекции'}]],
    })
}


function checkPermission(userid) {
    const permissionArray = [17854316313,];
    if (permissionArray.indexOf(userid) > -1) return 1;
    return 0;
}

//
// bot.on('message', async msg => {
//     console.log(msg);
//
// })

const now = new Date().toLocaleDateString()
const nowt = new Date().toLocaleTimeString()


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Получить id чата'},
        {command: '/date', description: 'Дата'},
        {command: '/time', description: 'Время'},
        {command: '/ttable', description: 'расписание'},])

    bot.onText(/^\/start/i, function (message) {
        if (checkPermission(message.from.id) === 0) {
            bot.sendMessage(message.chat.id, `Access closed. Use "/info"`);
            return;
        }
        bot.sendMessage(message.chat.id, "Привет !");
    })

    bot.onText(/^\/info/i, function (message) {
        // if (checkPermission(message.from.id) === 0) {
        //     bot.sendMessage(message.chat.id, "Permission denied");
        //     return;
        // }
        bot.sendMessage(message.chat.id, `${message.from.id}`);
    })

    bot.onText(/^\/date/i, function (message) {
        if (checkPermission(message.from.id) === 0) {
            bot.sendMessage(message.chat.id, `Access closed. Use "/info"`);
            return
        }
        bot.sendMessage(message.chat.id, `${now}`)
    })

    bot.onText(/^\/time/i, function (message) {

        if (checkPermission(message.from.id) === 0) {
            bot.sendMessage(message.chat.id, `Access closed. Use "/info"`);
            return
        }
        bot.sendMessage(message.chat.id, `${nowt}`)
    })

    bot.onText(/^\/ttable/i, (message) => {
        if (checkPermission(message.from.id) === 0) {
            bot.sendMessage(message.chat.id, `Access closed. Use "/info"`);
            return
        }
        bot.sendMessage(message.chat.id, 'Расписание', keyboard);
    })

    bot.on('callback_query', query => {
        bot.sendMessage(query.message.chat.id, `${query.data}`)
        console.log(query);
    })

    // bot.on('polling_error',(error)=>{
    //     console.log(error.code);
    // })
}


start()