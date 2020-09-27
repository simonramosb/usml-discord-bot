var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');





// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');





});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `/`
    if (message.substring(0, 1) == '/') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ayuda':
                bot.sendMessage({
                    to: channelID,
                    message:'``` Comandos: /hola /pelusa /mariquito /enano /comunista /jose /meme ```'
                });
            break;
            //
            case 'hola':
                bot.sendMessage({
                    to: channelID,
                    message: '¡Hola ' + user + '!'
                });
            break;
            //
            case 'pelusa':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pelusa, edu o Gantrax? Hmmm...'
                });
            break;
            //
            case 'mariquito':
                bot.sendMessage({
                    to: channelID,
                    message: '¡Eres un mariquito, ' + user + '!'
                });
            break;
            //
            case 'comunista':
                bot.sendMessage({
                    to: channelID,
                    message: '¡Qué boludos son los comunistas!'
                });
            break;
            //
            case 'enano':
                bot.sendMessage({
                    to: channelID,
                    message: 'Una vez cuando estabamos medio mamelucos metimos como ocho en un fiat 600'
                });
            break;
            //
            case 'jose':
                bot.sendMessage({
                    to: channelID,
                    message: 'Por favor, no me lo recuerdes...  https://i.imgur.com/8TT65kc.png '
                });
            break;
            //
            case 'meme':
                const fs = require("fs");
                let directory_name = "memes"; 
                let filenames = fs.readdirSync(directory_name);
                
                var all = new Array();
                let a = 0;
                filenames.forEach((file) => { 
                    console.log("File:", file); 
                    all[a] = file.toString();
                    a++;
                }); 
                /////////////////
                const num = (Math.floor(Math.random()* all.length)+1).toString();
                bot.uploadFile({
                    to: channelID,
                    file: `./memes/${all[num]}`
                });
                // DEBUG MENSAJE
                // bot.sendMessage({
                //     to: channelID,
                //     message: `${all.length}`
                // });
            break;
         }
     }
});
bot.on("guildMemberAdd", (user) => {

    let channel = bot.channels.get('718880107007180911');

    channel.send('Hola ' + user + ' bienvenido al discord de la USML. Todo dentro de la USML, nada fuera de ella!'); 

});