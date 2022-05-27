const TGApi = require("node-telegram-bot-api")
const {gameOptions, againOptions}= require('./options')
const token = "5433296427:AAG7bj-uy5wXpI0zKQXIUdbNAgb-yyWfsz4"

const bot = new TGApi(token, {polling: true})

const chats = {}


function privacyChecker(userid){
    const permissionArray=[1785431632]
    if (permissionArray.indexOf(userid)>-1)
        return 1;
    return 0;
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId,'Отгадывай', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить Username'},
        {command: '/game', description: 'Угадай цифру'},

    ])

    bot.on('message', async msg => {
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/43e/041/43e041ad-afbb-34c9-8e62-222f29474c0e/10.webp')
            return bot.sendMessage(chatId, `Привет`)
        }
        if (!privacyChecker(text === '/info')) {
            return bot.sendMessage(chatId, `${msg.from.username}`)
        }
        if (!privacyChecker(text === '/game')) {
            return startGame(chatId);
        }
        await bot.sendMessage(chatId, 'Я тебя на понял, напиши еще раз')
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/6.webp')

    })
    bot.on('callback_query',async msg=>{
        const data=msg.data;
        const chatId=msg.message.chat.id;
        if(data ==='/again'){
            startGame(chatId)
        }
        if(data === chats[chatId]){
            return  bot.sendMessage(chatId,`Поздравляю, ты отгадал цифру ${chats[chatId]}`,againOptions), await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/1.webp')
        } else{
            return  bot.sendMessage(chatId,`Ты ошибся, бот загадал цифру ${chats[chatId]}`,againOptions), await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/6.webp')

        }

    })
}
start()